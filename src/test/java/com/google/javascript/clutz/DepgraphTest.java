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
  public void testKnownGoogProvideParsing() throws Exception {
    Depgraph depgraph = parseFile("partialCrossModuleTypeImports/cross_module_type.depgraph");
    assertThat(depgraph.getGoogProvides()).containsExactly("googprovide.exporter");
  }
}
