package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static org.junit.Assert.*;

import com.google.javascript.clutz.Options;

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
  public void testFilterSourcesDepgraphs() throws Exception {
    Options opts = new Options(new String[] {
        "javascript/closure/other_file_not_in_depgraph.js",
        "javascript/closure/string/string.js",
        "blaze-out/blah/my/blaze-out-file.js",
        "--externs", "extern1.js", "extern2.js",
        "--depgraphs", DepgraphTest.DEPGRAPH_PATH.toFile().toString(),
        "--depgraphs_filter_sources",
        "-o", "output.d.ts"
    });
    // Outputs are filtered by what appears in the depgraph.
    assertThat(opts.arguments).containsExactly("javascript/closure/string/string.js",
        "blaze-out/blah/my/blaze-out-file.js").inOrder();
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
      assertThat(expected.getMessage()).isEqualTo("No files were given");
    }
  }
}
