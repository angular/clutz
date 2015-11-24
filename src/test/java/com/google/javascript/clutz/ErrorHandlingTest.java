package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import org.junit.Test;

public class ErrorHandlingTest {
  @Test
  public void testOverriddenIncompatibleStaticField() {
    assertThatProgram(
            "goog.provide('X');",
            "goog.provide('Y');",
            "/** @constructor */",
            "X = function() {};",
            "/** @type {string} */ X.f;",
            "/** @constructor @extends {X} */",
            "Y = function() {};",
            "/** @type {number} */ Y.f;")
        .reportsDiagnosticsContaining(
            "statically declared field that does not match the type of a parent field");
  }

  @Test
  public void testMissingSymbolOrExtern() {
    assertThatProgram(
            "goog.provide('foo.x');",
            "/** @param {some.Unknown} y */",
            "foo.x = function(y) {};")
        .reportsDiagnosticsContaining("missing some types");
  }

  @Test
  public void testReportsSourceSnippets() {
    assertThatProgram(
            "goog.provide('foo.x');",
            "/** @param {some.Unknown} y */",
            "foo.x = function(y) {};")
        .reportsDiagnosticsContaining("foo.x = function");
  }
}
