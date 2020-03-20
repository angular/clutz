package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertWithMessage;

public class TestUtil {
  private TestUtil() {}

  public static void assertIsGoogModuleOrProvide(String sourceText, String testName) {
    boolean hasGoogModule = hasStartingCall(sourceText, "goog.module(");
    boolean hasGoogProvide = hasStartingCall(sourceText, "goog.provide(");
    assertWithMessage(
            "The input file for test '"
                + testName
                + "' must specify a goog.module or goog.provide to avoid clashing with other tests"
                + " files")
        .that(hasGoogModule || hasGoogProvide)
        .isTrue();
  }

  private static boolean hasStartingCall(String sourceText, String call) {
    for (String line : sourceText.split("\n", -1)) {
      if (line.replaceAll("[ ]+", "").startsWith(call)) {
        return true;
      }
    }
    return false;
  }
}
