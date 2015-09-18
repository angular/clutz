package com.google.javascript.cl2dts;

import static com.google.javascript.cl2dts.ProgramSubject.assertThatProgram;
import static java.util.Collections.singletonList;

import org.junit.Test;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class MultiFileTest {

  // Repro for https://github.com/angular/closure-to-dts/issues/101
  @Test
  public void testPruneSymbolsProvidedInOtherFile() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("prune_other/require.d.ts"));
    assertThatProgram(
        singletonList(input("prune_other/require.js")),
        singletonList(input("prune_other/provide.js")))
        .generatesDeclarations(false, expected);
  }

  private File input(String relativePath) {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = ProgramSubject.class.getPackage().getName();
    Path myPackage = testDir.resolve(packageName.replace('.', File.separatorChar));
    return myPackage.resolve(relativePath).toAbsolutePath().toFile();
  }
}
