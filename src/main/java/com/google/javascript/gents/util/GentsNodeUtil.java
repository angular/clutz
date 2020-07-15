package com.google.javascript.gents.util;

import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.TokenStream;

/**
 * Utility methods for dealing with Closure's AST patterns used in Gents.
 *
 * <p>Ideally, the rest of the code will not do low-level AST manipulations and go through the
 * utilities here, but there a lot more refactoring to be done to achieve that.
 */
public class GentsNodeUtil {

  private GentsNodeUtil() {}

  /**
   * Returns true is the object is an object literal where all keys are valid JS identifiers:
   *
   * <p>{A, B, C} -> true
   *
   * <p>{A, B: B, foo() {}} -> true
   *
   * <p>{'abc-def': 0} -> false
   *
   * <p>{123: 123} -> false
   *
   * <p>{[foo()]: 0} -> false
   */
  public static boolean isObjLitWithJSIdentifierKeys(Node node) {
    if (!node.isObjectLit()) return false;
    for (Node child : node.children()) {
      if (!(child.isStringKey() || child.isMemberFunctionDef())
          || !TokenStream.isJSIdentifier(child.getString())) {
        return false;
      }
    }
    return true;
  }
}
