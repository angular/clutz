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
    Options opts =
        new Options(
            new String[] {"foo.js", "--externs", "extern1.js", "extern2.js", "-o", "output.d.ts"});
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
    assertThat(opts.output).isEqualTo("output.d.ts");
  }

  @Test
  public void testFilterSourcesDepgraphs() throws Exception {
    Options opts =
        new Options(
            new String[] {
              "javascript/closure/other_file_not_in_depgraph.js",
              "javascript/closure/string/string.js",
              "blaze-out/blah/my/blaze-out-file.js",
              "--depgraphs",
              DepgraphTest.DEPGRAPH_PATH.toFile().toString(),
              "--depgraphs_filter_sources",
            });
    // Arguments are filtered by what appears in the depgraph.
    assertThat(opts.arguments)
        .containsExactly(
            "javascript/closure/string/string.js", // kept as a root in depgraph
            "blaze-out/blah/my/blaze-out-file.js") // kept as a non-root in depgraph
        .inOrder();
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
              "--externs",
              "extern1.js",
              "extern2.js",
              "-o",
              "output.d.ts"
            });
    assertThat(opts.arguments).containsExactly("foo.js");
    assertThat(opts.entryPoints).containsExactly("ns.entryPoint1", "ns.entryPoint2");
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js").inOrder();
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
      assertThat(expected.getMessage()).isEqualTo("No files or externs were given");
    }
  }

  @Test
  public void testShouldSupportExternsOnly() throws Exception {
    Options opts = new Options(new String[] {"--externs", "extern1.js"});
    assertThat(opts.externs).containsExactly("extern1.js");
  }

  @Test
  public void testShouldPruneRepeatedExterns() throws Exception {
    Options opts =
        new Options(new String[] {"a.js", "extern1.js", "--externs", "extern1.js", "extern2.js"});
    assertThat(opts.externs).containsExactly("extern1.js", "extern2.js");
    assertThat(opts.arguments).containsExactly("a.js");
  }

  @Test
  public void testShouldSupportFilePathsWithSpaces() throws Exception {
    Options opts =
        new Options(
            new String[] {
              "--externs", "dir with spaces/common/dom.js", "--externs", "common/browser api.js",
            });
    assertThat(opts.externs)
        .containsExactly("dir with spaces/common/dom.js", "common/browser api.js");
  }

  @Test
  public void testIgnoresDepgraphNonRootExterns() throws Exception {
    Options opts =
        new Options(
            new String[] {
              // a random file from the depgraph. Not relevant to the test, but we need at least
              // one input.
              "my/thing/static/js/0-bootstrap.js",
              "--depgraphs",
              DepgraphTest.DEPGRAPH_PATH.toFile().toString(),
            });
    assertThat(opts.externs).isEmpty();
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
  public void testIgnoresDepgraphRootExternsIfNotPassedToExterns() throws Exception {
    // Due to "exported" libraries, what the depgraph considers "root" can be incorrect for the
    // purposes of clutz. Arguments and Externs lists should only be filtered down
    // with depgraph info and never extended.
    Options opts =
        new Options(
            new String[] {
              // a random file from the depgraph. Not relevant to the test, but we need at least
              // one input.
              "my/thing/static/js/0-bootstrap.js",
              "--depgraphs",
              DepgraphTest.DEPGRAPH_PATH.toFile().toString(),
            });
    assertThat(opts.externs).isEmpty();
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
