package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import org.junit.Test;

public class ClutzErrorManagerTest {
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
        .diagnosticStream()
        .containsMatch("ERROR.*statically declared field that does not match the type of a parent");
  }

  @Test
  public void testMissingSymbolOrExtern() {
    assertThatProgram(
            "goog.provide('foo.x');",
            "/** @param {some.Unknown} y */",
            "foo.x = function(y) {};")
        .diagnosticStream()
        .containsMatch("ERROR.*missing some types");
  }

  @Test
  public void testDuplicateSymbol() {
    // Useful
    assertThatProgram(
            "/** @type {number} */ var x = 1;",
            "/** @type {number} */ var x = 2;")
        .diagnosticStream()
        .containsMatch("ERROR.*variable x redefined");
  }

  @Test
  public void testReportsSourceSnippets() {
    assertThatProgram(
            "goog.provide('foo.x');",
            "/** @param {some.Unknown} y */",
            "foo.x = function(y) {};")
        .diagnosticStream()
        .contains("foo.x = function");
  }

  @Test
  public void testReportsWarningsInTests() {
    assertThatProgram(
            "/** @see */",
            "var noSee;")
        .diagnosticStream()
        .containsMatch("WARNING.*@see tag missing description");
  }
}
