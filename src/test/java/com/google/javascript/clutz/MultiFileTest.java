package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;
import static java.util.Collections.singletonList;

import com.google.common.collect.ImmutableList;
import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Collections;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;

public class MultiFileTest {

  @Rule public TestName name = new TestName();

  // Repro for https://github.com/angular/closure-to-dts/issues/101
  @Test
  public void shouldPruneProvidesFromNonrootFile() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("require.d.ts"));
    assertThatProgram(singletonList(input("require.js")), singletonList(input("provide.js")))
        .generatesDeclarations(expected);
  }

  @Test
  public void shouldResolveNamedTypes() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("index.d.ts"));
    assertThatProgram(
            ImmutableList.of(input("index.js"), input("dep.js")), Collections.<File>emptyList())
        .generatesDeclarations(expected);
  }

  @Test
  public void shouldWorkWithOutOfOrderProvides() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("index.d.ts"));
    assertThatProgram(
            ImmutableList.of(input("index.js"), input("dep.js")), Collections.<File>emptyList())
        .generatesDeclarations(expected);
  }

  @Test
  public void googModule() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("goog_module.d.ts"));
    assertThatProgram(
            ImmutableList.of(
                input("required_module.js"),
                input("required_module_default.js"),
                input("required.js"),
                input("goog_module.js")),
            Collections.<File>emptyList())
        .generatesDeclarations(expected);
  }

  @Test
  public void depgraph() throws Exception {
    String expected = DeclarationGeneratorTests.getTestFileText(input("depgraph.d.ts"));
    assertThatProgram(
            ImmutableList.of(input("root.js")),
            ImmutableList.of(
                input("transitive.js"),
                input("transitive_unused.js"),
                input("transitive_namespace.js")))
        .generatesDeclarations(expected);
  }

  private File input(String filename) {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = ProgramSubject.class.getPackage().getName();
    Path myPackage = testDir.resolve(packageName.replace('.', File.separatorChar));
    return myPackage.resolve(name.getMethodName()).resolve(filename).toAbsolutePath().toFile();
  }
}
