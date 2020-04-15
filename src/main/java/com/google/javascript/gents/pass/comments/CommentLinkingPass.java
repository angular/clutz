package com.google.javascript.gents.pass.comments;

import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.parsing.parser.trees.Comment;
import com.google.javascript.rhino.Node;

/** Links comments directly to the AST to preserve locations in file */
public final class CommentLinkingPass implements CompilerPass {

  private final Compiler compiler;
  private final NodeComments nodeComments;

  public CommentLinkingPass(Compiler compiler) {
    this.compiler = compiler;
    this.nodeComments = new NodeComments();
  }

  public NodeComments getComments() {
    return nodeComments;
  }

  @Override
  public void process(Node externs, Node root) {
    for (Node script : root.children()) {
      if (script.isScript()) {
        // Note: this doesn't actually copy the list since the underlying list is already an
        // immutable list.
        ImmutableList<Comment> comments =
            ImmutableList.copyOf(compiler.getComments(script.getSourceFileName()));
        NodeTraversal.traverse(
            compiler, script, new LinkCommentsForOneFile(compiler, comments, nodeComments));
      }
    }
  }
}
