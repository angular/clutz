package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.io.Files;
import com.google.javascript.clutz.Depgraph;

import org.junit.Test;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.List;

public class DepgraphTest {

  @Test
  public void testParseFile() throws Exception {
    List<File> testInputFiles = DeclarationGeneratorTests.getTestInputFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.endsWith(".depgraph");
      }
    });
    List<String> contents = new ArrayList<>();
    for (File testInputFile : testInputFiles) {
      contents.add(Files.toString(testInputFile, UTF_8));
    }
    Depgraph depgraph = Depgraph.parseFrom(contents);
    assertThat(depgraph.getRoots())
        .containsExactly("my/thing/static/js/annotations/annotations-canvas-controller.js");
  }
}
