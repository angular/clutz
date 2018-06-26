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
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class MultiFileTest {

  @Rule public TestName name = new TestName();

  // Repro for https://github.com/angular/closure-to-dts/issues/101
  @Test
  public void shouldPruneProvidesFromNonrootFile() throws Exception {
    File golden = input("require.d.ts");
    assertThatProgram(singletonList(input("require.js")), singletonList(input("provide.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void shouldResolveNamedTypes() throws Exception {
    File golden = input("index.d.ts");
    assertThatProgram(
            ImmutableList.of(input("index.js"), input("dep.js")), Collections.<File>emptyList())
        .generatesDeclarations(golden);
  }

  @Test
  public void shouldWorkWithOutOfOrderProvides() throws Exception {
    File golden = input("index.d.ts");
    assertThatProgram(
            ImmutableList.of(input("index.js"), input("dep.js")), Collections.<File>emptyList())
        .generatesDeclarations(golden);
  }

  @Test
  public void googModule() throws Exception {
    File golden = input("goog_module.d.ts");
    assertThatProgram(
            ImmutableList.of(
                input("required_module.js"),
                input("required_module_default.js"),
                input("required.js"),
                input("goog_module.js")),
            Collections.<File>emptyList())
        .generatesDeclarations(golden);
  }

  @Test
  public void depgraph() throws Exception {
    File golden = input("depgraph.d.ts");
    assertThatProgram(
            ImmutableList.of(input("root.js")),
            ImmutableList.of(
                input("transitive.js"),
                input("transitive_unused.js"),
                input("transitive_namespace.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void tsickleEmit() throws Exception {
    File golden = input("tsickle_emit.d.ts");
    assertThatProgram(
            ImmutableList.of(input("uses_tsickle_type.js")),
            ImmutableList.of(input("tsickle_emit.skip.tsickle.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void skipEmitWithTypedefs() throws Exception {
    File golden = input("skipped.d.ts");
    assertThatProgram(
            ImmutableList.of(input("uses_type.js")),
            ImmutableList.of(input("skipped_typedef.skip.tsickle.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void multifilePartial() throws Exception {
    File golden = input("total.d.ts");
    assertThatProgram(
            ImmutableList.of(input("missing_imported_base.js")),
            ImmutableList.of(
                input("named_base_exporter.js"),
                input("default_base_exporter.js"),
                input("default_object_exporter.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void partialCrossModuleTypeImports() throws Exception {
    File golden = input("total.d.ts");
    assertThatProgram(
            ImmutableList.of(input("goog_module_importer.js")),
            ImmutableList.of(
                input("goog_provide_exporter.js"), input("goog_legacy_namespace_exporter.js")))
        .generatesDeclarations(golden);
  }

  @Test
  public void aliasedInterface() throws Exception {
    File golden = input("aliasedInterface.d.ts");
    assertThatProgram(
            ImmutableList.of(
                input("alias_for_interface.js"), input("aliased_interface_with_static.js")),
            Collections.<File>emptyList())
        .generatesDeclarations(golden);
  }

  private File input(String filename) {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = ProgramSubject.class.getPackage().getName();
    Path myPackage = testDir.resolve(packageName.replace('.', File.separatorChar));
    return myPackage.resolve(name.getMethodName()).resolve(filename).toAbsolutePath().toFile();
  }
}
