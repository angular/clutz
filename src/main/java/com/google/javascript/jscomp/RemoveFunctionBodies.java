package com.google.javascript.jscomp;

import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

/**
 * Simple pass which removes function implementations, leaving just the signature.
 */
public class RemoveFunctionBodies
    extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  public RemoveFunctionBodies(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, this);
  }


  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    if (n.isBlock() && parent != null && parent.isFunction()) {
      parent.removeChild(n);
      parent.addChildToBack(IR.empty());
      compiler.reportCodeChange();
    }
  }
}
