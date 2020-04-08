package com.google.javascript.gents;

import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.Map;

/** Represents the mapping from an AST Node to its corresponding comment. */
public class NodeComments {
  private final Map<Node, String> nodeToComment = new HashMap<>();

  public void addComment(Node n, String comment) {
    if (hasComment(n)) {
      comment = getComment(n) + comment;
    }
    setComment(n, comment);
  }

  public void setComment(Node n, String comment) {
    nodeToComment.put(n, comment);
  }

  public boolean hasComment(Node n) {
    return nodeToComment.containsKey(n);
  }

  public String getComment(Node n) {
    return nodeToComment.get(n);
  }

  public void clearComment(Node n) {
    nodeToComment.remove(n);
  }

  public void moveComment(Node from, Node to) {
    if (getComment(from) != null) {
      addComment(to, getComment(from));
      clearComment(from);
    }
  }

  public void replaceWithComment(Node oldNode, Node newNode) {
    newNode.useSourceInfoFrom(newNode);
    oldNode.replaceWith(newNode);
    moveComment(oldNode, newNode);
  }
}
