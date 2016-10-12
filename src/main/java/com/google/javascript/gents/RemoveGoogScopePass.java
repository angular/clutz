package com.google.javascript.gents;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import javax.annotation.Nullable;

/**
 * Compiler pass removing the {@code goog.scope} wrapper, so that the module and class
 * transformations can take effect.
 *
 * <p>This is safe because the the file is converted into a module in the following pass.
 */
public final class RemoveGoogScopePass extends AbstractTopLevelCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  public RemoveGoogScopePass(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    Node maybeCallNode = n.getFirstChild();
    if (maybeCallNode == null || maybeCallNode.getToken() != Token.CALL) {
      return;
    }

    String callName = maybeCallNode.getFirstChild().getQualifiedName();
    if (!"goog.scope".equals(callName)) {
      return;
    }

    // Extract the goog.scope contents, and add them to module being constructed.
    Node blockOfScopeContents = n.getLastChild().getLastChild().getLastChild();
    blockOfScopeContents.detachFromParent();


    // Rewrite the AST, moving each node in the contents of the scope after the node.

    // Create a marker so that we know where to insert the goog.scope contents.
    Node insertAfterThisNode = n;

    @Nullable Node nodeToMove = blockOfScopeContents.getFirstChild();
    while (nodeToMove != null) {
      // Store the next node in a temp variable since detaching the node breaks the chain.
      Node nextNodeToMove = nodeToMove.getNext();
      nodeToMove.detachFromParent();

      n.getParent().addChildAfter(nodeToMove, insertAfterThisNode);

      insertAfterThisNode = nodeToMove;
      nodeToMove = nextNodeToMove;
    }

    // Remove the goog.scope calls.
    n.detachFromParent();
    compiler.reportCodeChange();
  }
}
