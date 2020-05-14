package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static org.junit.Assert.*;

import com.google.javascript.jscomp.CompilerOptions;
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
    Options opts = new Options(new String[] {"foo.js", "-o", "output.d.ts"});
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.output).isEqualTo("output.d.ts");
  }

  @Test
  public void testClosureEntryPoint() throws Exception {
    Options opts =
        new Options(
            new String[] {
              "foo.js",
              "--closure_entry_points",
              "ns.entryPoint1",
              "ns.entryPoint2",
              "-o",
              "output.d.ts"
            });
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.entryPoints).containsExactly("ns.entryPoint1", "ns.entryPoint2");
    assertThat(opts.output).isEqualTo("output.d.ts");
  }

  @Test
  public void testHandleEmptyCommandLine() throws Exception {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    System.setErr(new PrintStream(out));
    try {
      new Options(new String[0]);
      fail("Should throw");
    } catch (CmdLineException expected) {
      assertThat(expected.getMessage()).isEqualTo("No files were given");
    }
  }

  @Test
  public void testShouldSupportFilePathsWithSpaces() throws Exception {
    Options opts =
        new Options(
            new String[] {
              "dir with spaces/common/dom.js", "common/browser api.js",
            });
    assertThat(opts.arguments)
        .containsExactly("dir with spaces/common/dom.js", "common/browser api.js");
  }

  @Test
  public void testClosureEnvCustom() throws Exception {
    Options opts =
        new Options(
            new String[] {
              "my/thing/static/js/0-bootstrap.js", "--closure_env", "CUSTOM",
            });
    assertThat(opts.closureEnv).isEqualTo(CompilerOptions.Environment.CUSTOM);
    assertThat(opts.getCompilerOptions().getEnvironment())
        .isEqualTo(CompilerOptions.Environment.CUSTOM);
  }

  @Test
  public void testStopOption() throws Exception {
    Options opts = new Options(new String[] {"--", "foo.js", "bar.js"});
    assertThat(opts.arguments).containsExactly("foo.js", "bar.js").inOrder();
  }
}
