package com.google.javascript.gents;

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
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
      RewriteStatus rewriteStatus = maybeRewriteAlias(nodeToMove);
      // (1) nodeToMove is detached, alias to provided namespace is recorded, the next node is
      // returned. The next node should be 'maybeRewriteAlias()' checked before it can be moved out
      // of goog.scope
      if (rewriteStatus != stillAttached) {
        nodeToMove = rewriteStatus.nextNode;
        continue;
      }

      // (2) Alias is re-assigned with the provided namespace. In this case, node is not detached
      // and stillAttached sentinel is returned. nodeToMove needs to be moved out of goog.scope
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

  /**
   * If the node is a local alias declaration for a provided namespace then store mapping and detach
   * the node. If the node is an assignment for a local alias's property then rewrite the local
   * alias.
   *
   * @return RewriteStatus (see class comment).
   */
  private RewriteStatus maybeRewriteAlias(Node node) {
    switch (node.getFirstChild().getToken()) {
      case NAME:
        return maybeRecordAndRemoveAlias(node.getFirstChild());
      case ASSIGN:
        maybeReassignAlias(node.getFirstChild());
        return stillAttached;
      default:
        return stillAttached;
    }
  }

  /** Sentinel value used to express that the node is still attached. */
  private static final RewriteStatus stillAttached = new RewriteStatus(IR.number(0));

  /**
   * When going over nodes the results is that either: (1) node is already detached. (2) node is
   * still attached and needs to be moved.
   *
   * <p>If the node is detached RewriteStatus keeps track of the next node to process. That node
   * could be null, if there is nothing to process.
   */
  private static class RewriteStatus {
    private final Node nextNode;

    private RewriteStatus(Node node) {
      this.nextNode = node;
    }
  }

  private RewriteStatus maybeRecordAndRemoveAlias(Node assign) {
    Node lhs = assign;
    Node rhs = assign.getLastChild();
    if (rhs == null) { // var foo;
      return stillAttached;
    }
    if (isInProvidedNamespace(rhs)) {
      aliasToProvidedNamespace.put(lhs.getString(), rhs.getQualifiedName());
      Node next = assign.getParent().getNext();
      assign.detachFromParent();
      compiler.reportCodeChange();
      return new RewriteStatus(next);
    }
    return stillAttached;
  }

  private boolean isInProvidedNamespace(Node node) {
    for (String providedNamespace : providedNamespaces) {
      @Nullable String rhsQualifiedName = node.getQualifiedName();
      if ((rhsQualifiedName != null) && providedNamespace.startsWith(node.getQualifiedName())) {
        return true;
      }
    }
    return false;
  }

  private void maybeReassignAlias(Node assign) {
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
    return;
  }
}
