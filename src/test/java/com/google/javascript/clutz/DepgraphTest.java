package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;

import java.nio.file.Path;
import java.util.Collections;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class DepgraphTest {
  static final Path DEPGRAPH_PATH = DeclarationGeneratorTest.getTestInputFile("closure.depgraph");

  static Depgraph parseFile(String filename) {
    return Depgraph.parseFrom(
        Collections.singletonList(
            DeclarationGeneratorTest.getTestInputFile(filename).toFile().toString()));
  }

  @Test
  public void testParseFile() throws Exception {
    Depgraph depgraph = parseFile("closure.depgraph");
    assertThat(depgraph.getRoots())
        .containsExactly(
            "my/thing/static/js/annotations/annotations-canvas-controller.js",
            "blaze-out/blah/my/blaze-out-file.js")
        .inOrder();
    assertThat(depgraph.getNonroots())
        .containsExactly("javascript/closure/base.js", "javascript/closure/string/string.js")
        .inOrder();
    assertThat(depgraph.getRootExterns()).containsExactly("my/root/extern.js").inOrder();
    assertThat(depgraph.getNonrootExterns()).containsExactly("my/nonroot/extern.js").inOrder();
  }

  @Test
  public void testKnownGoogProvideParsing() throws Exception {
    Depgraph depgraph = parseFile("partialCrossModuleTypeImports/cross_module_type.depgraph");
    assertThat(depgraph.getGoogProvides()).containsExactly("googprovide.exporter");
  }
}
