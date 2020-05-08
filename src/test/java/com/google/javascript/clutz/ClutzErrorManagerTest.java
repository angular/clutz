package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class ClutzErrorManagerTest {
  @Test
  public void testReportsWarningsInTests() {
    assertThatProgram("/** @see */", "var noSee;")
        .diagnosticStream()
        .containsMatch("WARNING.*@see tag missing description");
  }
}
