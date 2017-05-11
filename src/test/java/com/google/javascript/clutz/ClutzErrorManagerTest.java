package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import org.junit.Test;

public class ClutzErrorManagerTest {

  @Test
  public void testMissingSymbolOrExtern() {
    assertThatProgram(
            "goog.provide('foo.x');", "/** @param {some.Unknown} y */", "foo.x = function(y) {};")
        .diagnosticStream()
        .containsMatch("ERROR.*missing some types");
  }

  @Test
  public void testDuplicateSymbol() {
    // Useful
    assertThatProgram("/** @type {number} */ var x = 1;", "/** @type {number} */ var x = 2;")
        .diagnosticStream()
        .containsMatch("ERROR.*Variable x first declared in");
  }

  @Test
  public void testReportsSourceSnippets() {
    assertThatProgram(
            "goog.provide('foo.x');", "/** @param {some.Unknown} y */", "foo.x = function(y) {};")
        .diagnosticStream()
        .contains("foo.x = function");
  }

  @Test
  public void testReportsWarningsInTests() {
    assertThatProgram("/** @see */", "var noSee;")
        .diagnosticStream()
        .containsMatch("WARNING.*@see tag missing description");
  }
}
