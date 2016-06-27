package com.google.javascript.gents;

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
        case Token.FUNCTION:
          JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
          if (bestJSDocInfo != null && bestJSDocInfo.isConstructor()) {
            constructorToClass(n, bestJSDocInfo);
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Converts class methods, static methods, inheritance and superclass calls.
   */
  private class ClassMemberConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getType()) {
        case Token.CLASS:
          addClassToScope(n);
          break;
        case Token.EXPR_RESULT:
          maybeRemoveInherits(n);
          maybeReplaceSuperCall(n);

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
   * Converts @constructor annotated functions into class definitions.
   */
  void constructorToClass(Node n, JSDocInfo jsDoc) {
    String className = NodeUtil.getNearestFunctionName(n);
    // Break up function
    Node name = n.getFirstChild();
    Node params = n.getSecondChild();
    Node body = n.getLastChild();
    n.detachChildren();

    // The empty name corresponds to anonymous constructors.
    // The name is usually located in the surrounding context.
    // ie. /** @constructor */ var A = function() {};
    // is converted to: var A = class {};
    if (name.getString().equals("")) {
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
    if (exprNode.getFirstChild().isCall()) {
      Node callNode = exprNode.getFirstChild();
      // Remove goog.inherits calls
      if (!callNode.getFirstChild().getQualifiedName().equals("goog.inherits")) {
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
      if (lhs.getLastChild().getString().equals("prototype")) {
        compiler.report(JSError.make(
            exprNode,
            GENTS_CLASS_PASS_ERROR,
            String.format("Cannot directly assign to prototype for %s",
                lhs.getFirstChild().getQualifiedName())));
      }
    }
  }

  /**
   * Attempts to convert a ES5 superclass constructor call into a ES6 super() call.
   *
   * ex. B.call(this, args) -> super(args);
   * ex. A.base(this, 'constructor', args) -> super(args);
   *
   * This returns without any modification if the node is not an superclass call statement.
   */
  void maybeReplaceSuperCall(Node exprNode) {
    if (exprNode.getFirstChild().isCall()) {
      Node callNode = exprNode.getFirstChild();
      // First validate that we are inside a constructor call that extends another class
      Node classNode = NodeUtil.getEnclosingClass(exprNode);
      if (classNode == null) {
        return;
      }

      String className = NodeUtil.getName(classNode);
      // Super calls for root classes are not converted
      if (classNode.getSecondChild().isEmpty()) {
        compiler.report(JSError.make(
            exprNode,
            GENTS_CLASS_PASS_ERROR,
            String.format("Cannot call superclass in root class %s", className)));
        return;
      }
      String superClassName = classNode.getSecondChild().getQualifiedName();

      // super.call(this, args...) -> super(args...)
      if (callNode.getFirstChild().getQualifiedName().equals(superClassName + ".call")) {
        if (callNode.getSecondChild().isThis()) {
          callNode.replaceChild(callNode.getFirstChild(), IR.superNode());
          callNode.removeChild(callNode.getSecondChild());
          compiler.reportCodeChange();
          return;
        }
      }

      // name.base(this, 'constructor', args...) -> super(args...)
      if (callNode.getFirstChild().getQualifiedName().equals(className + ".base")) {
        if (callNode.getSecondChild().isThis() &&
            callNode.getChildAtIndex(2).getString().equals("constructor")) {
          callNode.replaceChild(callNode.getFirstChild(), IR.superNode());
          callNode.removeChild(callNode.getSecondChild());
          callNode.removeChild(callNode.getSecondChild());
          compiler.reportCodeChange();
          return;
        }
      }
    }
  }

  /**
   * Adds a class node to the top level scope.
   *
   * This determines the classname using the nearest available name node.
   */
  void addClassToScope(Node n) {
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
    Node root = IR.name(propList.next());
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
        if (fullName.getFirstChild().getLastChild().getString().equals("prototype")) {
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
        if (n.getLastChild().getString().equals("prototype")) {
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
