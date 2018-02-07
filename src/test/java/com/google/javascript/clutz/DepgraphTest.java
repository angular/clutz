package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;

import java.nio.file.Path;
import java.util.Collections;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class DepgraphTest {

  static final Path DEPGRAPH_PATH = DeclarationGeneratorTests.getTestInputFile("closure.depgraph");

  private Depgraph parseFile() {
    return Depgraph.parseFrom(Collections.singletonList(DEPGRAPH_PATH.toFile().toString()));
  }

  @Test
  public void testParseFile() throws Exception {
    Depgraph depgraph = parseFile();
    assertThat(depgraph.getRoots())
        .containsExactly(
            "my/thing/static/js/annotations/annotations-canvas-controller.js",
            "blaze-out/blah/my/blaze-out-file.js")
        .inOrder();
    assertThat(depgraph.getNonroots())
        .containsExactly("javascript/closure/base.js", "javascript/closure/string/string.js")
        .inOrder();
    assertThat(depgraph.getRootExterns()).isEmpty();
    assertThat(depgraph.getNonrootExterns()).containsExactly("javascript/common/dom.js").inOrder();
  }
}
