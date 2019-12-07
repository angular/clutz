package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;
import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.kohsuke.args4j.CmdLineException;

@RunWith(JUnit4.class)
public class OptionsTest {

  @Test
  public void testFullUsage() throws Exception {
    final String TEST_EXTERNS_MAP =
        TypeScriptGeneratorTest.getTestDirPath("test_externs_map.json").toString();

    Options opts =
        new Options(
            new String[] {
              "foo.js",
              "--externs",
              "extern1.js",
              "extern2.js",
              "-o",
              "output",
              "--externsMap",
              TEST_EXTERNS_MAP,
              "--externsOverride",
              "any:CustomAny",
              "--externsOverride",
              "a:b"
            });
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
    assertThat(opts.output).isEqualTo("output");
    assertThat(opts.externsMapFile).isEqualTo(TEST_EXTERNS_MAP);
    assertThat(opts.externsOverride).containsExactly("any:CustomAny", "a:b").inOrder();
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

  @Test
  public void testStopOption() throws Exception {
    Options opts =
        new Options(
            new String[] {"--externs", "extern1.js", "extern2.js", "--", "foo.js", "bar.js"});
    assertThat(opts.arguments).containsExactly("foo.js", "bar.js").inOrder();
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
  }
}
