package com.google.javascript.jscomp;

import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

public class MoveMembersOutOfConstructor
    extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  public MoveMembersOutOfConstructor(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, this);
  }


  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    if (n.isExprResult()) {
      Node enclosingClassMemberFunction = NodeUtil.getEnclosingClassMemberFunction(n);
      Node enclosingClassMembers = NodeUtil.getEnclosingType(n, Token.CLASS_MEMBERS);

      if (enclosingClassMemberFunction != null) {
        Node newMember = null;
        Node identifier;
        if (NodeUtil.isExprAssign(n)) {
          Node exprResult = n.getFirstChild();
          identifier = exprResult.getFirstChild();
          Node initializer = exprResult.getLastChild();
          Node newIdentifier = IR.name(identifier.getLastChild().getString());
          newIdentifier.setDeclaredTypeExpression(identifier.getDeclaredTypeExpression());
          newMember = IR.exprResult(IR.assign(newIdentifier, initializer.cloneTree()));
        } else {
          identifier = n.getFirstChild();
          Node newIdentifier = IR.name(identifier.getLastChild().getString());
          newIdentifier.setDeclaredTypeExpression(identifier.getDeclaredTypeExpression());
          newMember = IR.exprResult(newIdentifier);
        }
        if (identifier.getQualifiedName().startsWith("this.")) {
          enclosingClassMembers.addChildToBack(newMember);
          parent.removeChild(n);
          if (NodeUtil.isEmptyBlock(enclosingClassMemberFunction.getFirstChild().getLastChild())) {
            enclosingClassMemberFunction.getParent().removeChild(enclosingClassMemberFunction);
          }
          compiler.reportCodeChange();
        }
      }
    }
  }
}
