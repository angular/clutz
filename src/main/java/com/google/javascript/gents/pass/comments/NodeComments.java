package com.google.javascript.gents.pass.comments;

import com.google.common.collect.Lists;
import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Represents the mapping from an AST Node to its corresponding comment. This is a shared interface
 * used by both the CommentLinkingPass and the AstCommentLinkingPass to associate Nodes in the AST
 * with comments. Two passes are needed because the AstCommentLinkingPass uses comments associated
 * with Nodes by JSCompiler, but that doesn't capture all comments. The CommentLinkingPass gets all
 * comments, but is error prone in that it uses its own heuristic to associate them with Nodes.
 *
 * <p>This class exists, instead of just having both classes record their information in a Map,
 * because the existing CommentLinkingPass already made heavy use of this class throughout the
 * codebase before the AstCommentLinkingPass was implemented.
 */
public class NodeComments {
  private final Map<Node, List<GeneralComment>> nodeToComment = new HashMap<>();

  public void addComment(Node n, GeneralComment comment) {
    addComments(n, Lists.newArrayList(comment));
  }

  public void addComments(Node n, List<GeneralComment> newComments) {
    List<GeneralComment> commentList =
        nodeToComment.computeIfAbsent(n, (Node k) -> Lists.newArrayList());
    commentList.addAll(newComments);
  }

  public void setComments(Node n, List<GeneralComment> comments) {
    nodeToComment.put(n, comments);
  }

  public boolean hasComment(Node n) {
    return nodeToComment.containsKey(n) && !nodeToComment.get(n).isEmpty();
  }

  public List<GeneralComment> getComments(Node n) {
    return nodeToComment.get(n);
  }

  public void clearComment(Node n) {
    nodeToComment.remove(n);
  }

  public void moveComment(Node from, Node to) {
    if (getComments(from) != null) {
      addComments(to, getComments(from));
      clearComment(from);
    }
  }

  public void replaceWithComment(Node oldNode, Node newNode) {
    newNode.useSourceInfoFrom(newNode);
    oldNode.replaceWith(newNode);
    moveComment(oldNode, newNode);
  }

  /**
   * Used for debugging purposes only to get a helpful representation of which comments are being
   * recorded by this class.
   */
  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    for (Map.Entry<Node, List<GeneralComment>> entry : nodeToComment.entrySet()) {
      if (builder.length() != 0) {
        builder.append('\n');
      }
      builder.append(entry.getKey().hashCode());
      builder.append(" => ");
      builder.append(entry.getValue());
    }
    return builder.toString();
  }
}
