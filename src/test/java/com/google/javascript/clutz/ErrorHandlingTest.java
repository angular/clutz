package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import org.junit.Test;

public class ErrorHandlingTest {
  @Test
  public void testOverriddenIncompatibleStaticField() {
    assertThatProgram("goog.provide('X');\n" +
        "goog.provide('Y');\n"
        + "/** @constructor */"
        + "X = function() {};\n"
        + "/** @type {string} */ X.f;\n"
        + "/** @constructor @extends {X} */"
        + "Y = function() {};\n"
        + "/** @type {number} */ Y.f;\n")
        .reportsDiagnosticsContaining(DeclarationGenerator.CLUTZ_OVERRIDDEN_STATIC_FIELD.key);
  }

  @Test
  public void testMissingSymbolOrExtern() {
    assertThatProgram(
            "goog.provide('foo.x');\n"
            + "/** @param {some.Unknown} y */\n"
            + "foo.x = function(y) {};\n")
        .reportsDiagnosticsContaining(DeclarationGenerator.CLUTZ_MISSING_TYPES.key);
  }
}
