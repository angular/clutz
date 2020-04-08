package com.google.javascript.gents.util;

import com.google.javascript.rhino.Node;

/**
 * Utility methods for dealing with Closure's AST patterns used in Gents.
 *
 * <p>Ideally, the rest of the code will not do low-level AST manipulations and go through the
 * utilities here, but there a lot more refactoring to be done to achieve that.
 */
public class GentsNodeUtil {

  private GentsNodeUtil() {}

  /**
   * Returns true is the object is an object literal where all values are symbols that match the
   * name:
   *
   * <p>{A, B, C} -> true
   *
   * <p>{A, B: B} -> true
   *
   * <p>{A: C} -> false
   *
   * <p>{A: A + 1} -> false
   *
   * <p>TODO(rado): see if we can also support simple renaming objects like {NewName: OldName}.
   */
  public static boolean isObjLitWithSimpleRefs(Node node) {
    if (!node.isObjectLit()) return false;
    for (Node child : node.children()) {
      if (!child.isStringKey() || !child.getFirstChild().isName()) {
        return false;
      }
      if (!child.getString().equals(child.getFirstChild().getString())) {
        return false;
      }
    }
    return true;
  }
}
