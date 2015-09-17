package com.google.javascript.cl2dts;

import static com.google.common.truth.Truth.assertThat;
import static java.lang.String.format;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.Joiner;
import com.google.common.io.Files;
import com.google.javascript.cl2dts.DeclarationGenerator.Options;

import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

public class RequireFromOtherFileTest {

  // Repro for https://github.com/angular/closure-to-dts/issues/101
  @Test
  public void testRequireFromOtherFile() throws Exception {
    File requireFile = write("require.js",
        "goog.provide('a.b');",
        "goog.require('a.b.Stuff');",
        "/** @constructor */",
        "a.b.Thing = function() {};");

    File provideFile = write("provide.js",
        "goog.provide('a.b.Stuff');",
        "/** @constructor @extends {a.b.Thing} */",
        "a.b.Stuff = function() {};");

    File depgraphFile = write("lib.depgraph",
        format("[['roots',[['%s']]]]", requireFile.getAbsolutePath()));

    ByteArrayOutputStream out = new ByteArrayOutputStream();
    System.setOut(new PrintStream(out));
    new DeclarationGenerator(new Options(new String[] {
        provideFile.getAbsolutePath(),
        requireFile.getAbsolutePath(),
        "--depgraphs", depgraphFile.getAbsolutePath(),
        "--debug"}))
        .generateDeclarations();
    assertThat(out.toString(UTF_8.name())).doesNotContain("Stuff");
  }

  private File write(String filename, String... contentLines) throws IOException {
    int dot = filename.lastIndexOf(".");
    String base = filename.substring(0, dot);
    String ext = filename.substring(dot + 1);
    File newFile = File.createTempFile(getClass().getSimpleName() + "_" + base, ext);
    Files.write(Joiner.on("\n").join(contentLines), newFile, UTF_8);
    return newFile;
  }
}
