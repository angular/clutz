package com.google.javascript.gents;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Nullable;

/**
 * Compiler pass removing the {@code goog.scope} wrapper, so that the module and class
 * transformations can take effect.
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

    // Collect all of the children into a list before detaching them from the parent,
    // since detaching breaks the "getNext()" chain.
    List<Node> scopeChildren = new ArrayList<>();
    @Nullable Node maybeChildToAdd = blockOfScopeContents.getFirstChild();
    while (maybeChildToAdd != null) {
      scopeChildren.add(maybeChildToAdd);
      maybeChildToAdd = maybeChildToAdd.getNext();
    }

    // Now that we have the contents of the goog.scope, rewrite the AST.

    // Create a marker so that we know where to insert the goog.scope contents.
    Node insertAfterThisNode = n;

    for (Node scopeChild : scopeChildren) {
      scopeChild.detachFromParent();
      n.getParent().addChildAfter(scopeChild, insertAfterThisNode);
      insertAfterThisNode = scopeChild;
    }

    // Remove the goog.scope calls.
    n.detachFromParent();
    compiler.reportCodeChange();
  }
}
