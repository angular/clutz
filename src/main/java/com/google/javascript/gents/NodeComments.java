package com.google.javascript.gents;

import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.Map;

/** Represents the mapping from an AST Node to its corresponding comment. */
public class NodeComments {
  final Map<Node, String> nodeToComment = new HashMap<>();

  void putComment(Node n, String comment) {
    if (hasComment(n)) {
      comment = getComment(n) + comment;
    }
    nodeToComment.put(n, comment);
  }

  boolean hasComment(Node n) {
    return nodeToComment.containsKey(n);
  }

  String getComment(Node n) {
    return nodeToComment.get(n);
  }

  void clearComment(Node n) {
    nodeToComment.remove(n);
  }

  void moveComment(Node from, Node to) {
    if (getComment(from) != null) {
      putComment(to, getComment(from));
      clearComment(from);
    }
  }

  void replaceWithComment(Node oldNode, Node newNode) {
    newNode.useSourceInfoFrom(newNode);
    oldNode.getParent().replaceChild(oldNode, newNode);
    moveComment(oldNode, newNode);
  }
}
