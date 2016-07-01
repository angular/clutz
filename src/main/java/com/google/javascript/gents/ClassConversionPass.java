package com.google.javascript.gents;

import com.google.common.base.Preconditions;
import com.google.common.base.Splitter;
import com.google.common.collect.Iterators;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Converts ES5 JavaScript classes into ES6 JavaScript classes. Prototype declarations are
 * converted into the new class definitions of ES6.
 */
public final class ClassConversionPass implements CompilerPass {

  static final DiagnosticType GENTS_CLASS_PASS_ERROR = DiagnosticType.error(
      "GENTS_CLASS_PASS_ERROR", "{0}");

  private final AbstractCompiler compiler;
  private Map<String, Node> classes;

  public ClassConversionPass(AbstractCompiler compiler) {
    this.compiler = compiler;
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
      switch (n.getType()) {
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
      switch (n.getType()) {
        case CLASS:
          addClassToScope(n);
          break;
        case EXPR_RESULT:
          ClassMemberDeclaration declaration = new ClassMemberDeclaration(n);
          if (declaration.isValid()) {
            // TODO(renez): extend this to handle fields as well
            if (declaration.rhs.isFunction()) {
              maybeMoveMethodsIntoClasses(declaration);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Converts inheritance and superclass calls.
   */
  private class InheritanceConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getType()) {
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
      superClass = getProp(superClassName);
    }

    // TODO(renez): traverse function body to pull out field declaration info

    // Generate new class node with only a constructor method
    Node constructor = IR.memberFunctionDef(
        "constructor",
        IR.function(IR.name(""), params, body)
    );
    // Sets jsdoc info to preserve type declarations on method
    constructor.setJSDocInfo(jsDoc);

    Node classMembers = new Node(Token.CLASS_MEMBERS, constructor);
    Node classNode = new Node(Token.CLASS, name, superClass, classMembers);

    n.getParent().replaceChild(n, classNode);
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
      // Handle static methods
      if ("statics".equals(child.getString())) {
        for (Node child2 : child.getFirstChild().children()) {
          classMembers.addChildToBack(objectLiteralMethodToMethodDef(child2, true));
        }
      } else { // prototype methods
        classMembers.addChildToBack(objectLiteralMethodToMethodDef(child, false));
      }
    }
    Node classNode = new Node(Token.CLASS, IR.empty(), superClass, classMembers);

    n.getParent().replaceChild(n, classNode);
    compiler.reportCodeChange();
  }

  /**
   * Converts functions declared in object literals into a member function definition.
   */
  Node objectLiteralMethodToMethodDef(Node objectLiteralMethod, boolean isStatic) {
    Preconditions.checkState(objectLiteralMethod.isStringKey());
    Preconditions.checkState(objectLiteralMethod.getFirstChild().isFunction());

    Node fn = objectLiteralMethod.getFirstChild();
    fn.detachFromParent();
    Node methodDef = IR.memberFunctionDef(objectLiteralMethod.getString(), fn);
    methodDef.setJSDocInfo(objectLiteralMethod.getJSDocInfo());
    methodDef.setStaticMember(isStatic);
    return methodDef;
  }

  /**
   * Attempts to move a method declaration into a class definition. This generates a new
   * MEMBER_FUNCTION_DEF Node while removing the old function node from the AST.
   *
   * This fails to move a method declaration when referenced class does not exist in scope.
   */
  void maybeMoveMethodsIntoClasses(ClassMemberDeclaration declaration) {
    if (!classes.containsKey(declaration.getClassName())) {
      // Only emit error on non-static (prototype) methods.
      // This is because we can assign to non-class objects such as records.
      if (!declaration.isStatic()) {
        compiler.report(JSError.make(
            declaration.fullName,
            GENTS_CLASS_PASS_ERROR,
            String.format("Class %s could not be found", declaration.getClassName())));
      }
      return;
    }

    Node classNode = classes.get(declaration.getClassName());
    Node classMembers = classNode.getLastChild();

    // Detach nodes in order to move them around in the AST.
    declaration.exprRoot.detachFromParent();
    declaration.rhs.detachFromParent();

    Node memberFunc = IR.memberFunctionDef(declaration.getMemberName(), declaration.rhs);
    memberFunc.setStaticMember(declaration.isStatic());
    memberFunc.setJSDocInfo(declaration.jsDoc);

    // Append the new method to the class
    classMembers.addChildToBack(memberFunc);
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
            GENTS_CLASS_PASS_ERROR,
            String.format("Class %s could not be found.", className)));
        return;
      }

      // Check that superclass is consistent
      Node classNode = classes.get(className);
      String storedSuperClassName = classNode.getSecondChild().getQualifiedName();
      if (classNode.getSecondChild().isEmpty() || !storedSuperClassName.equals(superClassName)) {
        compiler.report(JSError.make(
            exprNode,
            GENTS_CLASS_PASS_ERROR,
            String.format("Invalid superclass for %s", className)));
        return;
      }

      exprNode.detachFromParent();
      compiler.reportCodeChange();
    } else if (exprNode.getFirstChild().isAssign()) {
      Node assignNode = exprNode.getFirstChild();
      // Report error if trying to assign to prototype directly
      Node lhs = assignNode.getFirstChild();
      if ("prototype".equals(lhs.getLastChild().getString())) {
        compiler.report(JSError.make(
            exprNode,
            GENTS_CLASS_PASS_ERROR,
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
    if (classNode == null) {
      return;
    }

    String className = NodeUtil.getName(classNode);
    // Super calls for root classes are not converted
    if (classNode.getSecondChild().isEmpty()) {
      compiler.report(JSError.make(
          callNode,
          GENTS_CLASS_PASS_ERROR,
          String.format("Cannot call superclass in root class %s", className)));
      return;
    }
    String superClassName = classNode.getSecondChild().getQualifiedName();

    // B.call(this, args) -> super(args);
    if (callName.equals(superClassName + ".call") &&
        callNode.getSecondChild().isThis()) {
      callNode.replaceChild(callNode.getFirstChild(), IR.superNode());
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
        n.getParent().replaceChild(n, IR.superNode());
        nameNode.detachFromParent();

        callNode.replaceChild(callNode.getFirstChild(), nameNode);
        callNode.removeChild(callNode.getSecondChild());
        compiler.reportCodeChange();
        return;
      }
    }

    // A.base(this, 'constructor', args) -> super(args);
    // A.base(this, 'foo', args) -> super.foo(args);
    if (callName.equals(className + ".base") &&
        callNode.getSecondChild().isThis()) {
      String methodName = callNode.getChildAtIndex(2).getString();

      if ("constructor".equals(methodName)) {
        callNode.replaceChild(callNode.getFirstChild(), IR.superNode());
      } else {
        callNode.replaceChild(callNode.getFirstChild(), getProp("super." + methodName));
      }

      callNode.removeChild(callNode.getSecondChild());
      callNode.removeChild(callNode.getSecondChild());
      compiler.reportCodeChange();
      return;
    }
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
          GENTS_CLASS_PASS_ERROR,
          String.format("Class %s has been defined multiple times.", className)));
      return;
    }
    classes.put(className, n);
  }

  /**
   * Converts a qualified name string into a tree of GETPROP.
   *
   * ex. "foo.bar.baz" is converted to GETPROP(GETPROP(NAME(foo), STRING(bar)), STRING(baz)).
   */
  static Node getProp(String fullname) {
    Iterator<String> propList = Splitter.on('.').split(fullname).iterator();
    String rootName = propList.next();
    Node root;

    switch (rootName) {
      case "this":
        root = IR.thisNode();
        break;
      case "super":
        root = IR.superNode();
        break;
      default:
        root = IR.name(rootName);
        break;
    }

    if (!propList.hasNext()) {
      return root;
    }
    return IR.getprop(root, propList.next(), Iterators.toArray(propList, String.class));
  }

  /**
   * Represents an assignment to a class member.
   */
  private final class ClassMemberDeclaration {
    Node exprRoot;
    Node assignNode;
    Node fullName;
    Node rhs;
    JSDocInfo jsDoc;

    ClassMemberDeclaration(Node n) {
      this.exprRoot = n;
      this.assignNode = n.getFirstChild();
      this.fullName = assignNode.getFirstChild();
      this.rhs = assignNode.getLastChild();
      this.jsDoc = NodeUtil.getBestJSDocInfo(n);
    }

    boolean isValid() {
      return assignNode.isAssign() && fullName.isGetProp();
    }

    boolean isStatic() {
      if (NodeUtil.isPrototypePropertyDeclaration(exprRoot)) {
        if ("prototype".equals(fullName.getFirstChild().getLastChild().getString())) {
          return false;
        }
      }
      return true;
    }

    /**
     * Gets the full class name of this declaration.
     * ex. A.B.C.prototype.foo -> A.B.C
     * ex. A.B.C.D.bar -> A.B.C.D
     */
    String getClassName() {
      Node n = fullName;
      if (isStatic()) {
        return n.getFirstChild().getQualifiedName();
      }
      while (n.isGetProp()) {
        if ("prototype".equals(n.getLastChild().getString())) {
          return n.getFirstChild().getQualifiedName();
        }
        n = n.getFirstChild();
      }
      throw new IllegalArgumentException("Invalid declaration name: " + n.toStringTree());
    }

    /**
     * Gets the name of the method this defines.
     */
    String getMemberName() {
      if (fullName.isGetProp()) {
        return fullName.getLastChild().getString();
      }
      throw new IllegalArgumentException("Invalid declaration name: " + fullName.toStringTree());
    }
  }

}
