package com.google.javascript.cl2dts;

import static com.google.common.truth.Truth.assertThat;

import com.google.javascript.cl2dts.DeclarationGenerator.Options;

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
    List<String> args = new ArrayList<>();
    args.add("foo.js");
    args.add("--depgraphs");
    for (File testInputFile : testInputFiles) {
      args.add(testInputFile.getAbsolutePath());
    }
    Options opts = new Options(args.toArray(new String[testInputFiles.size() + 2]));
    List<String> depgraphRoots = new DeclarationGenerator(opts).parseDepgraphRoots();
    assertThat(depgraphRoots)
        .containsExactly("my/thing/static/js/annotations/annotations-canvas-controller.js");
  }
}
