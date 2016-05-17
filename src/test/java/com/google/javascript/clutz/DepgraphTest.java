package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;

import org.junit.Test;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Collections;

public class DepgraphTest {

  static final Path DEPGRAPH_PATH = DeclarationGeneratorTests.getTestInputFile("closure.depgraph");

  private Depgraph parseFile(boolean allFilesAreRoots) throws IOException {
    return Depgraph.parseFrom(allFilesAreRoots,
        Collections.singletonList(DEPGRAPH_PATH.toFile().toString()));
  }

  @Test
  public void testParseFile() throws Exception {
    Depgraph depgraph = parseFile(false);
    assertThat((Iterable<String>) depgraph.getRoots())
        .containsExactly("my/thing/static/js/annotations/annotations-canvas-controller.js",
            "blaze-out/blah/my/blaze-out-file.js")
        .inOrder();
  }

  @Test
  public void testAllFiles() throws Exception {
    Depgraph depgraph = parseFile(true);
    assertThat((Iterable<String>) depgraph.getRoots())
        .containsExactly("javascript/closure/base.js", "javascript/closure/string/string.js",
            "my/thing/static/js/annotations/annotations-canvas-controller.js",
            "blaze-out/blah/my/blaze-out-file.js")
        .inOrder();

  }
}
