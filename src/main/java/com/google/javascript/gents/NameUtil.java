package com.google.javascript.gents;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.Set;
import javax.annotation.Nullable;

/** Utility methods for variable naming. */
public class NameUtil {
  private AbstractCompiler compiler;

  public NameUtil(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  /** Returns the last identifier of a qualified name string. */
  String lastStepOfName(String name) {
    return lastStepOfName(NodeUtil.newQName(compiler, name));
  }

  /** Returns the last identifier of a name node. */
  String lastStepOfName(Node n) {
    return n.isGetProp() ? n.getLastChild().getString() : n.getQualifiedName();
  }

  /**
   * Gets the longest namespace that is a prefix of the name string. Returns null if no namespaces
   * are valid prefixes.
   */
  @Nullable
  String findLongestNamePrefix(String name, Set<String> namespaces) {
    return findLongestNamePrefix(NodeUtil.newQName(compiler, name), namespaces);
  }

  /**
   * Gets the longest namespace that is a prefix of the name node. Returns null if no namespaces are
   * valid prefixes.
   */
  @Nullable
  String findLongestNamePrefix(Node name, Set<String> namespaces) {
    if (namespaces.contains(name.getQualifiedName())) {
      return name.getQualifiedName();
    } else if (name.isGetProp()) {
      return findLongestNamePrefix(name.getFirstChild(), namespaces);
    }
    return null;
  }

  /**
   * Returns the new name string with a prefix replaced with the new prefix. Returns input name if
   * prefix does not exist.
   */
  String replacePrefixInName(String name, String prefix, String newPrefix) {
    Node nameNode = NodeUtil.newQName(compiler, name);
    // Placeholder node to ensure name has a parent
    Node placeholder = new Node(Token.EMPTY, nameNode);
    replacePrefixInName(nameNode, prefix, newPrefix);
    return placeholder.getFirstChild().getQualifiedName();
  }

  /**
   * In-place replaces a prefix with a new prefix in a name node. Does nothing if prefix does not
   * exist.
   */
  void replacePrefixInName(Node name, String prefix, String newPrefix) {
    if (name.matchesQualifiedName(prefix)) {
      Node newName = NodeUtil.newQName(compiler, newPrefix);
      JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(name);
      newName.setJSDocInfo(jsdoc);
      name.getParent().replaceChild(name, newName);
    } else {
      if (name.isGetProp()) {
        replacePrefixInName(name.getFirstChild(), prefix, newPrefix);
      }
    }
  }
}
