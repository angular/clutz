package com.google.javascript.gents;

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javax.annotation.Nullable;

/**
 * Compiler pass removing the {@code goog.scope} wrapper, so that the module and class
 * transformations can take effect.
 *
 * <p>This is safe because the the file is converted into a module in the following pass.
 */
public final class RemoveGoogScopePass extends AbstractTopLevelCallback implements CompilerPass {

  private final AbstractCompiler compiler;
  private final Set<String> providedNamespaces = new HashSet<>();
  private final Map<String, String> aliasToProvidedNamespace = new HashMap<>();

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
    if (callName == null) {
      return;
    }

    switch (callName) {
      case "goog.provide":
      case "goog.require":
        // Register the goog.provide/require namespaces, so that we can remove any aliases.
        providedNamespaces.add(maybeCallNode.getLastChild().getString());
        return;
      case "goog.scope":
        rewriteGoogScope(n);
        return;
      default:
        return;
    }
  }

  private void rewriteGoogScope(Node n) {
    // Extract the goog.scope contents, and add them to module being constructed.
    Node blockOfScopeContents = n.getLastChild().getLastChild().getLastChild();
    blockOfScopeContents.detachFromParent();


    // Rewrite the AST, moving each node in the contents of the scope after the node.

    // Create a marker so that we know where to insert the goog.scope contents.
    Node insertAfterThisNode = n;

    @Nullable Node nodeToMove = blockOfScopeContents.getFirstChild();
    while (nodeToMove != null) {
      nodeToMove = maybeRewriteAlias(nodeToMove);
      if (nodeToMove == null) {
        break;
      }

      // Store the next node in a temp variable since detaching the node breaks the chain.
      Node nextNodeToMove = nodeToMove.getNext();
      nodeToMove.detachFromParent();

      n.getParent().addChildAfter(nodeToMove, insertAfterThisNode);

      insertAfterThisNode = nodeToMove;
      nodeToMove = nextNodeToMove;
    }

    n.detachFromParent();
    compiler.reportCodeChange();
  }

  private Node maybeRewriteAlias(Node node) {
    switch (node.getFirstChild().getToken()) {
      case NAME:
        node = maybeRecordAndRemoveAlias(node.getFirstChild());
        break;
      case ASSIGN:
        maybeReasignAlias(node.getFirstChild());
      default:
        break;
    }
    return node;
  }

  private Node maybeRecordAndRemoveAlias(Node assign) {
    Node next = assign.getParent();
    Node lhs = assign;
    Node rhs = assign.getLastChild();
    if (providedNamespaces.contains(rhs.getQualifiedName())) {
      aliasToProvidedNamespace.put(lhs.getString(), rhs.getQualifiedName());
      next = assign.getParent().getNext();
      assign.detachFromParent();
      compiler.reportCodeChange();
    }
    return next;
  }

  private void maybeReasignAlias(Node assign) {
    Node lhs = assign.getFirstChild();
    if (!lhs.isGetProp()) {
      // TODO(dpurpura): Add support for GET_ELEM.  (e.g. Foo['abc'])
      return;
    }

    // Find the name of the deepest first child.
    String alias = null;
    for (Node child = lhs; child != null; child = child.getFirstChild()) {
      if (child.isName()) {
        alias = child.getQualifiedName();
      }
    }

    checkNotNull(alias, "Missing name for alias");
    if (aliasToProvidedNamespace.containsKey(alias)) {
      String providedNamespace = aliasToProvidedNamespace.get(alias);

      String suffix = lhs.getQualifiedName().substring(alias.length());
      Node fullName = NodeUtil.newQName(compiler, providedNamespace + suffix);
      assign.replaceChild(lhs, fullName);
      compiler.reportCodeChange();
    }
  }
}
