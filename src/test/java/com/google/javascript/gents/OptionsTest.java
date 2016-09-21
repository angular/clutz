package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;
import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.junit.Test;
import org.kohsuke.args4j.CmdLineException;

public class OptionsTest {

  @Test
  public void testFullUsage() throws Exception {
    Options opts = new Options(new String[]{
        "foo.js", "--externs", "extern1.js", "extern2.js", "-o", "output", "--externsMap",
        "externs_map.json",
    });
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
    assertThat(opts.output).isEqualTo("output");
    assertThat(opts.externsMapFile).isEqualTo("externs_map.json");
  }

  @Test
  public void testHandleEmptyCommandLine() throws Exception {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    PrintStream stdErr = System.err;
    System.setErr(new PrintStream(out));
    try {
      new Options(new String[0]);
      fail("Should throw");
    } catch (CmdLineException expected) {
      assertThat(expected.getMessage()).isEqualTo("No files were given");
    } finally {
      System.setErr(stdErr);
    }
  }
}
