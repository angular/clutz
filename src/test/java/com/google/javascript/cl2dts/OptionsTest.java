package com.google.javascript.cl2dts;

import static com.google.common.truth.Truth.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.kohsuke.args4j.CmdLineException;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class OptionsTest {

  @Test
  public void testFullUsage() throws Exception {
    Options opts = new Options(new String[] {
        "foo.js", "--externs", "extern1.js", "extern2.js", "-o", "output.d.ts"
    });
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
    assertThat(opts.output).isEqualTo("output.d.ts");
  }

  @Test
  public void testHandleEmptyCommandLine() throws Exception {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    System.setErr(new PrintStream(out));
    try {
      Options opts = new Options(new String[0]);
      fail("Should throw");
    } catch (CmdLineException expected) {}
  }
}
