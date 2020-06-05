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
   * Returns true is the object is an object literal where all values are simple symbols references:
   *
   * <p>{A, B, C} -> true
   *
   * <p>{A, B: B} -> true
   *
   * <p>{A: C} -> true
   *
   * <p>{A: A + 1} -> false
   *
   * <p>{A: f(1)} -> false
   */
  public static boolean isObjLitWithSimpleRefs(Node node) {
    if (!node.isObjectLit()) return false;
    for (Node child : node.children()) {
      if (!child.isStringKey() || !child.getFirstChild().isName()) {
        return false;
      }
    }
    return true;
  }
}
