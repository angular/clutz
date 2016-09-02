package com.google.javascript.gents;

import com.google.common.base.Preconditions;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.annotation.Nullable;

/**
 * Converts ES5 JavaScript classes into ES6 JavaScript classes. Prototype declarations are
 * converted into the new class definitions of ES6.
 */
public final class ClassConversionPass implements CompilerPass {

  private final AbstractCompiler compiler;
  private final NodeComments nodeComments;
  private Map<String, Node> classes;

  public ClassConversionPass(AbstractCompiler compiler, NodeComments nodeComments) {
    this.compiler = compiler;
    this.nodeComments = nodeComments;
    this.classes = new LinkedHashMap<>();
  }

  @Override
  public void process(Node externs, Node root) {
    for (Node child : root.children()) {
      // We convert each file independently to avoid merging class methods from different files.
      if (child.isScript()) {
        this.classes = new LinkedHashMap<>();
        NodeTraversal.traverseEs6(compiler, child, new ClassDefinitionConverter());
        NodeTraversal.traverseEs6(compiler, child, new ClassMemberConverter());
        NodeTraversal.traverseEs6(compiler, child, new FieldOnThisConverter());
        NodeTraversal.traverseEs6(compiler, child, new InheritanceConverter());
      }
    }
  }

  /**
   * Converts @constructor annotated functions into classes.
   */
  private class ClassDefinitionConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case FUNCTION:
          JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
          if (bestJSDocInfo != null && bestJSDocInfo.isConstructor()) {
            convertConstructorToClass(n, bestJSDocInfo);
          }
          break;
        case CALL:
          if ("goog.defineClass".equals(n.getFirstChild().getQualifiedName())) {
            convertDefineClassToClass(n);
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Converts class prototype methods and static methods.
   */
  private class ClassMemberConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case CLASS:
          addClassToScope(n);
          break;
        case EXPR_RESULT:
          ClassMemberDeclaration declaration = ClassMemberDeclaration.newDeclaration(n, classes);
          if (declaration == null) {
            break;
          }
          if (declaration.rhs != null && declaration.rhs.isFunction()) {
            moveMethodsIntoClasses(declaration);
          } else {
            // Ignore field declarations without a type annotation
            if (declaration.jsDoc != null && declaration.jsDoc.getType() != null) {
              moveFieldsIntoClasses(declaration);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Converts fields declared internally inside a class using the "this" keyword.
   */
  private class FieldOnThisConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (n.isExprResult()) {
        ClassMemberDeclaration declaration = ClassMemberDeclaration.newDeclarationOnThis(n);
        // Ignore field declarations without a type annotation
        if (declaration != null &&
            declaration.jsDoc != null &&
            declaration.jsDoc.getType() != null) {
          Node fnNode = NodeUtil.getEnclosingFunction(n);
          String fnName = fnNode.getParent().getString();
          JSTypeExpression type = declaration.jsDoc.getType();
          // All declarations of the form this.name = name;
          if ("constructor".equals(fnName) && declaration.rhsEqualToField()) {
            Node params = fnNode.getSecondChild();
            JSDocInfo constructorJsDoc = NodeUtil.getBestJSDocInfo(fnNode);

            for (Node param : params.children()) {
              JSTypeExpression paramType = constructorJsDoc.getParameterType(param.getString());
              // Names and types must be equal
              if (declaration.memberName.equals(param.getString()) && type.equals(paramType)) {
                // Add visibility directly to param if possible
                moveAccessModifier(declaration, param);
                n.detachFromParent();
                compiler.reportCodeChange();
                return;
              }
            }
          }
          moveFieldsIntoClasses(declaration);
        }
      }
    }

    /** Moves the access modifier from the original declaration to the constructor parameter */
    void moveAccessModifier(ClassMemberDeclaration declaration, Node param) {
      if (Visibility.PRIVATE.equals(declaration.jsDoc.getVisibility())) {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PRIVATE);
      } else if (Visibility.PROTECTED.equals(declaration.jsDoc.getVisibility())) {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PROTECTED);
      } else {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PUBLIC);
      }
    }
  }

  /**
   * Converts inheritance and superclass calls.
   */
  private class InheritanceConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case EXPR_RESULT:
          maybeRemoveInherits(n);
          break;
        case CALL:
          maybeReplaceSuperCall(n);
          break;
        default:
          break;
      }
    }
  }

  /**
   * Converts @constructor annotated functions into class definitions.
   */
  void convertConstructorToClass(Node n, JSDocInfo jsDoc) {
    Preconditions.checkState(n.isFunction());
    Preconditions.checkState(n.getFirstChild().isName());
    Preconditions.checkState(n.getSecondChild().isParamList());
    Preconditions.checkState(n.getLastChild().isBlock());
    // Break up function
    Node name = n.getFirstChild();
    Node params = n.getSecondChild();
    Node body = n.getLastChild();
    n.detachChildren();

    // The empty name corresponds to anonymous constructors.
    // The name is usually located in the surrounding context.
    // ie. /** @constructor */ var A = function() {};
    // is converted to: var A = class {};
    if (name.getString().isEmpty()) {
      name = IR.empty();
    }

    // Superclass defaults to empty
    Node superClass = IR.empty();
    if (jsDoc.getBaseType() != null) {
      // Fullname of superclass
      // Closure Compiler generates non-nullable base classes:
      // ie. A.B.C is parsed as !A.B.C
      String superClassName = jsDoc
          .getBaseType()
          .getRoot()
          .getFirstChild() // ignore the ! node as we always output non nullable types
          .getString();
      superClass = NodeUtil.newQName(compiler, superClassName);
    }

    // Generate new class node with only a constructor method
    Node constructor = IR.memberFunctionDef(
        "constructor",
        IR.function(IR.name(""), params, body)
    );
    // Sets jsdoc info to preserve type declarations on method
    constructor.setJSDocInfo(jsDoc);

    Node classMembers = new Node(Token.CLASS_MEMBERS, constructor);
    Node classNode = new Node(Token.CLASS, name, superClass, classMembers);

    nodeComments.replaceWithComment(n, classNode);
    compiler.reportCodeChange();
  }

  /**
   * Converts goog.defineClass calls into class definitions.
   */
  void convertDefineClassToClass(Node n) {
    Preconditions.checkState(n.isCall());
    Node superClass = n.getSecondChild();
    if (superClass.isNull()) {
      superClass = IR.empty();
    } else {
      superClass.detachFromParent();
    }

    Node classMembers = new Node(Token.CLASS_MEMBERS);
    for (Node child : n.getLastChild().children()) {
      if (child.isStringKey()) {
        // Handle static methods
        if ("statics".equals(child.getString())) {
          for (Node child2 : child.getFirstChild().children()) {
            convertOjbectLiteral(classMembers, child2, true);
          }
        } else { // prototype methods
          convertOjbectLiteral(classMembers, child, false);
        }
      } else {
        // Add all other members, such as EMPTY comment nodes, as is.
        child.detachFromParent();
        classMembers.addChildrenToBack(child);
      }
    }
    Node classNode = new Node(Token.CLASS, IR.empty(), superClass, classMembers);

    nodeComments.replaceWithComment(n, classNode);
    compiler.reportCodeChange();
  }

  /**
   * Converts functions and variables declared in object literals into member method and
   * field definitions
   */
  void convertOjbectLiteral(Node classMembers, Node objectLiteralMember, boolean isStatic) {
    Preconditions.checkState(objectLiteralMember.isStringKey());

    Node value = objectLiteralMember.getFirstChild();
    value.detachFromParent();

    if (value.isFunction()) {
      Node n = IR.memberFunctionDef(objectLiteralMember.getString(), value);
      n.setJSDocInfo(objectLiteralMember.getJSDocInfo());
      n.setStaticMember(isStatic);
      // Methods added to back
      classMembers.addChildToBack(n);
      nodeComments.moveComment(objectLiteralMember, n);
    } else {
      Node n = Node.newString(Token.MEMBER_VARIABLE_DEF, objectLiteralMember.getString());
      n.addChildToBack(value);
      n.setJSDocInfo(objectLiteralMember.getJSDocInfo());
      n.setStaticMember(isStatic);
      // Fields added to front
      addFieldToClassMembers(classMembers, n);
      nodeComments.moveComment(objectLiteralMember, n);
    }
  }

  /**
   * Attempts to move a method declaration into a class definition. This generates a new
   * MEMBER_FUNCTION_DEF Node while removing the old function node from the AST.
   */
  void moveMethodsIntoClasses(ClassMemberDeclaration declaration) {
    Node classMembers = declaration.classNode.getLastChild();
    String fieldName = declaration.memberName;

    // Detach nodes in order to move them around in the AST.
    declaration.exprRoot.detachFromParent();
    declaration.rhs.detachFromParent();

    Node memberFunc = IR.memberFunctionDef(fieldName, declaration.rhs);
    memberFunc.setStaticMember(declaration.isStatic);
    memberFunc.setJSDocInfo(declaration.jsDoc);

    // Append the new method to the class
    classMembers.addChildToBack(memberFunc);
    nodeComments.moveComment(declaration.exprRoot, memberFunc);
    compiler.reportCodeChange();
  }

  /**
   * Attempts to move a field declaration into a class definition. This generates a new
   * MEMBER_VARIABLE_DEF Node while persisting the old node in the AST.
   */
  void moveFieldsIntoClasses(ClassMemberDeclaration declaration) {
    Node classMembers = declaration.classNode.getLastChild();
    String fieldName = declaration.memberName;

    Node fieldNode = Node.newString(Token.MEMBER_VARIABLE_DEF, fieldName);
    fieldNode.setJSDocInfo(declaration.jsDoc);
    fieldNode.setStaticMember(declaration.isStatic);
    nodeComments.moveComment(declaration.exprRoot, fieldNode);

    // Add default value for fields
    if (declaration.rhs == null) {
      declaration.exprRoot.detachFromParent();
    } else if (NodeUtil.isLiteralValue(declaration.rhs, false)) {
      declaration.exprRoot.detachFromParent();
      declaration.rhs.detachFromParent();
      fieldNode.addChildToBack(declaration.rhs);
    } else {
      nodeComments.clearComment(declaration.exprRoot);
    }

    addFieldToClassMembers(classMembers, fieldNode);
    compiler.reportCodeChange();
  }

  /**
   * Attempts to remove an inheritance statement.
   * ex. goog.inherits(base, super)
   *
   * This returns without any modification if the node is not an inheritance statement.
   * This fails by reporting an error when the node is an invalid inheritance statement.
   */
  void maybeRemoveInherits(Node exprNode) {
    Preconditions.checkState(exprNode.isExprResult());
    if (exprNode.getFirstChild().isCall()) {
      Node callNode = exprNode.getFirstChild();
      // Remove goog.inherits calls
      if (!"goog.inherits".equals(callNode.getFirstChild().getQualifiedName())) {
        return;
      }
      String className = callNode.getSecondChild().getQualifiedName();
      String superClassName = callNode.getLastChild().getQualifiedName();

      // Check that class exists
      if (!classes.containsKey(className)) {
        compiler.report(JSError.make(
            exprNode,
            GentsErrorManager.GENTS_CLASS_PASS_ERROR,
            String.format("Class %s could not be found.", className)));
        return;
      }

      // Check that superclass is consistent
      Node classNode = classes.get(className);
      String storedSuperClassName = classNode.getSecondChild().getQualifiedName();
      if (classNode.getSecondChild().isEmpty() || !storedSuperClassName.equals(superClassName)) {
        compiler.report(JSError.make(
            exprNode,
            GentsErrorManager.GENTS_CLASS_PASS_ERROR,
            String.format("Invalid superclass for %s", className)));
        return;
      }

      exprNode.detachFromParent();
      compiler.reportCodeChange();
    } else if (exprNode.getFirstChild().isAssign()) {
      Node assignNode = exprNode.getFirstChild();
      // Report error if trying to assign to prototype directly
      Node lhs = assignNode.getFirstChild();
      if (lhs.isGetProp() && "prototype".equals(lhs.getLastChild().getString())) {
        compiler.report(JSError.make(
            exprNode,
            GentsErrorManager.GENTS_CLASS_PASS_ERROR,
            String.format("Cannot directly assign to prototype for %s",
                lhs.getFirstChild().getQualifiedName())));
      }
    }
  }

  /**
   * Attempts to convert a ES5 superclass call into a ES6 super() call.
   *
   * ex. B.call(this, args) -> super(args);
   * ex. B.prototype.foo.call(this, args) -> super.foo(args);
   * ex. A.base(this, 'constructor', args) -> super(args);
   * ex. A.base(this, 'foo', args) -> super.foo(args);
   *
   * This returns without any modification if the node is not an superclass call statement.
   */
  void maybeReplaceSuperCall(Node callNode) {
    Preconditions.checkState(callNode.isCall());
    String callName = callNode.getFirstChild().getQualifiedName();

    // First validate that we are inside a constructor call that extends another class
    Node classNode = NodeUtil.getEnclosingClass(callNode);
    if (callName == null || classNode == null) {
      return;
    }

    String className = NodeUtil.getName(classNode);

    // Translate super constructor or super method calls as follows:
    // A.base(this, 'constructor', args) -> super(args);
    // A.base(this, 'foo', args) -> super.foo(args);
    if (callName.equals(className + ".base") &&
        callNode.getSecondChild().isThis()) {
      // Super calls for root classes are not converted
      if (classNode.getSecondChild().isEmpty()) {
        compiler.report(JSError.make(
            callNode,
            GentsErrorManager.GENTS_CLASS_PASS_ERROR,
            String.format("Cannot call superclass in root class %s", className)));
        return;
      }
      String methodName = callNode.getChildAtIndex(2).getString();

      if ("constructor".equals(methodName)) {
        nodeComments.replaceWithComment(callNode.getFirstChild(), IR.superNode());
      } else {
        nodeComments.replaceWithComment(callNode.getFirstChild(),
            NodeUtil.newQName(compiler, "super." + methodName));
      }

      // Remove twice to get rid of "this" and the method name
      callNode.removeChild(callNode.getSecondChild());
      callNode.removeChild(callNode.getSecondChild());
      compiler.reportCodeChange();
      return;
    }

    String superClassName = classNode.getSecondChild().getQualifiedName();
    // B.call(this, args) -> super(args);
    if (callName.equals(superClassName + ".call") &&
        callNode.getSecondChild().isThis()) {
      nodeComments.replaceWithComment(callNode.getFirstChild(), IR.superNode());

      callNode.removeChild(callNode.getSecondChild());
      compiler.reportCodeChange();
      return;
    }

    // B.prototype.foo.call(this, args) -> super.foo(args);
    if (callName.startsWith(superClassName + ".prototype.") &&
        callName.endsWith(".call")) {
      if (callNode.getSecondChild().isThis()) {
        // Determine name of method being called
        Node nameNode = callNode.getFirstChild().getFirstChild();
        Node n = nameNode;
        while (!n.getLastChild().getString().equals("prototype")) {
          n = n.getFirstChild();
        }
        nameNode.detachFromParent();

        nodeComments.replaceWithComment(n, IR.superNode());
        nodeComments.replaceWithComment(callNode.getFirstChild(), nameNode);
        callNode.removeChild(callNode.getSecondChild());
        compiler.reportCodeChange();
        return;
      }
    }
  }

  /** Adds a field node before the first method node in classMembers */
  void addFieldToClassMembers(Node classMembers, Node field) {
    for (Node n : classMembers.children()) {
      if (n.isMemberFunctionDef()) {
        classMembers.addChildBefore(field, n);
        return;
      }
    }
    classMembers.addChildToBack(field);
  }

  /**
   * Adds a class node to the top level scope.
   *
   * This determines the classname using the nearest available name node.
   */
  void addClassToScope(Node n) {
    Preconditions.checkState(n.isClass());
    String className = NodeUtil.getName(n);
    if (className == null) {
      // We do not emit an error here as there can be anonymous classes without names.
      return;
    }
    if (classes.containsKey(className)) {
      compiler.report(JSError.make(
          n,
          GentsErrorManager.GENTS_CLASS_PASS_ERROR,
          String.format("Class %s has been defined multiple times.", className)));
      return;
    }
    classes.put(className, n);
  }

  /**
   * Represents a declaration of a class member.
   */
  private static class ClassMemberDeclaration {
    Node exprRoot;
    Node rhs;
    JSDocInfo jsDoc;

    boolean isStatic;
    Node classNode;
    String memberName;

    private ClassMemberDeclaration(Node n, boolean isStatic, Node classNode, String memberName) {
      this.exprRoot = n;
      this.rhs = getRhs(n);
      this.jsDoc = NodeUtil.getBestJSDocInfo(n);
      this.isStatic = isStatic;
      this.classNode = classNode;
      this.memberName = memberName;
    }

    /**
     * Returns whether the rhs is the same as the method name being declared
     * eg. this.a = a;
     */
    boolean rhsEqualToField() {
      return rhs != null && memberName.equals(rhs.getQualifiedName());
    }

    /**
     * Factory method for creating a new ClassMemberDeclaration on a declaration external to
     * a class.
     * <ul>
     * <li>{@code A.prototype.foo = function() {...}}</li>
     * <li>{@code A.prototype.w = 4}</li>
     * <li>{@code A.prototype.x}</li>
     * <li>{@code A.bar = function() {...}}</li>
     * <li>{@code A.y = 6}</li>
     * <li>{@code A.z}</li>
     * </ul>
     *
     * Returns null if the expression node is an invalid member declaration.
     */
    @Nullable
    static ClassMemberDeclaration newDeclaration(Node n, Map<String, Node> classes) {
      Node fullName = getFullName(n);
      // Node MUST NOT start with "this."
      if (!fullName.isGetProp() || containsThis(fullName)) {
        return null;
      }

      boolean isStatic = isStatic(fullName);
      String className = isStatic ?
          fullName.getFirstChild().getQualifiedName() :
          fullName.getFirstFirstChild().getQualifiedName();

      // Class must exist in scope
      if (!classes.containsKey(className)) {
        return null;
      }
      Node classNode = classes.get(className);
      String memberName = fullName.getLastChild().getString();

      return new ClassMemberDeclaration(n, isStatic, classNode, memberName);
    }

    /**
     * Factory method for creating a new ClassMemberDeclarationOnThis on a declaration internal
     * to a class via the "this" keyword.
     * <ul>
     * <li>{@code this.a = 5}</li>
     * <li>{@code this.b}</li>
     * </ul>
     *
     * Returns null if the expression node is an invalid member declaration.
     */
    @Nullable
    static ClassMemberDeclaration newDeclarationOnThis(Node n) {
      Node fullName = getFullName(n);
      // Node MUST start with "this."
      if (!fullName.isGetProp() || !containsThis(fullName)) {
        return null;
      }

      Node classNode = NodeUtil.getEnclosingClass(n);
      String memberName = fullName.getLastChild().getString();
      if (classNode == null) {
        return null;
      }

      return new ClassMemberDeclaration(n, false, classNode, memberName);
    }

    /**
     * Returns the full name of the class member being declared.
     */
    static Node getFullName(Node n) {
      return n.getFirstChild().isAssign() ? n.getFirstFirstChild() : n.getFirstChild();
    }

    /**
     * Returns the right hand side of the member declaration.
     */
    static Node getRhs(Node n) {
      return n.getFirstChild().isAssign() ? n.getFirstChild().getLastChild() : null;
    }

    /**
     * Returns whether a name starts with "this."
     */
    static boolean containsThis(Node fullName) {
      return fullName.isThis() || (fullName.isGetProp() && containsThis(fullName.getFirstChild()));
    }

    /**
     * Returns if a name refers to a static member of a class.
     */
    static boolean isStatic(Node fullName) {
      return !(fullName.getFirstChild().isGetProp() &&
          "prototype".equals(fullName.getFirstChild().getLastChild().getString()));
    }
  }
}
