package com.google.javascript.gents;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterators;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.Iterator;

/**
 * Converts ES5 JavaScript classes into ES6 JavaScript classes. Prototype declarations are
 * converted into the new class definitions of ES6.
 */
public final class ClassConversionPass extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  public ClassConversionPass(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
    switch (n.getType()) {
      case Token.FUNCTION:
        if (bestJSDocInfo != null && bestJSDocInfo.isConstructor()) {
          // Break up function
          Node name = n.getFirstChild();
          Node params = n.getSecondChild();
          Node body = n.getLastChild();
          n.detachChildren();

          // The empty name corresponds to anonymous constructors.
          // The name is usually located in the surrounding context.
          // ie. /** @constructor */ var A = function() {};
          // is converted to: var A = class {};
          if (!name.isName() || name.getString().equals("")) {
            name = IR.empty();
          }

          // Superclass defaults to empty
          Node superClass = IR.empty();
          if (bestJSDocInfo.getBaseType() != null) {
            // Fullname of superclass
            // Closure Compiler generates non-nullable base classes:
            // ie. A.B.C is parsed as !A.B.C
            String superClassName = bestJSDocInfo
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
          ).setJSDocInfo(bestJSDocInfo); // Sets jsdoc info to preserve type declarations
          Node classMembers = new Node(Token.CLASS_MEMBERS, constructor);
          Node classNode = new Node(Token.CLASS, name, superClass, classMembers);

          parent.replaceChild(n, classNode);
          compiler.reportCodeChange();
        }
        break;
      // TODO(renez): handle class methods and fields declared as part of the class prototype.
      default:
        break;
    }
  }

  /**
   * Converts a string into a tree of GETPROP.
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

}
