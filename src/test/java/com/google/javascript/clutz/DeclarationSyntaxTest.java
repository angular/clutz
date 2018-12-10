package com.google.javascript.clutz;

import static com.google.javascript.clutz.DeclarationGeneratorTests.JS_NO_EXTERNS;
import static com.google.javascript.clutz.DeclarationGeneratorTests.TS_SOURCES;
import static org.junit.Assert.fail;

import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.google.common.io.CharStreams;
import java.io.File;
import java.io.FilenameFilter;
import java.io.InputStreamReader;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * A test that checks the syntax of all {@code .d.ts} files using {@code tsc}, as a sanity check.
 */
@RunWith(JUnit4.class)
public class DeclarationSyntaxTest {
  private static final FilenameFilter JS_MULTIFILE_PARTIAL =
      (File dir, String name) ->
          JS_NO_EXTERNS.accept(dir, name) && dir.getName().equals("multifilePartial");

  private static final FilenameFilter JS_PARTIAL_CROSS_MODULE_TYPE_IMPORTS =
      (File dir, String name) ->
          JS_NO_EXTERNS.accept(dir, name) && dir.getName().equals("partialCrossModuleTypeImports");

  private static final FilenameFilter JS_ALIASED_INTERFACE =
      (File dir, String name) ->
          JS_NO_EXTERNS.accept(dir, name) && dir.getName().equals("aliasedInterface");

  public static final Path TSC =
      FileSystems.getDefault().getPath("node_modules", "typescript", "bin", "tsc");

  private static final ImmutableList<String> TSC_FLAGS =
      ImmutableList.of(
          "--noEmit",
          "--skipDefaultLibCheck",
          "--downlevelIteration",
          "--lib",
          "es5,dom,es2015.iterable",
          "--noImplicitAny",
          "--strictNullChecks");

  @Test
  public void testDeclarationSyntax() throws Exception {
    List<File> inputs = DeclarationGeneratorTests.getTestInputFilesNoPartial(JS_NO_EXTERNS);
    doTestDeclarationSyntax(inputs);
  }

  @Test
  public void testMultiFilePartialDeclarationSyntax() throws Exception {
    List<File> inputs = DeclarationGeneratorTests.getTestInputFiles(JS_MULTIFILE_PARTIAL);
    doTestDeclarationSyntax(inputs);
  }

  @Test
  public void testPartialCrossModuleTypeImportsDeclarationSyntax() throws Exception {
    List<File> inputs =
        DeclarationGeneratorTests.getTestInputFiles(JS_PARTIAL_CROSS_MODULE_TYPE_IMPORTS);
    doTestDeclarationSyntax(inputs);
  }

  @Test
  public void testAliasedInterfaceDeclarationSyntax() throws Exception {
    List<File> inputs =
        DeclarationGeneratorTests.getTestInputFiles(
            (File dir, String name) ->
                TS_SOURCES.accept(dir, name) && dir.getName().equals("aliasedInterface"));
    List<String> tsPaths = new ArrayList<>();
    for (File input : inputs) {
      tsPaths.add(input.getPath());
    }

    List<String> tscCommand = Lists.newArrayList(TSC.toString());
    tscCommand.addAll(TSC_FLAGS);
    tscCommand.add("src/resources/closure.lib.d.ts");
    tscCommand.addAll(tsPaths);
    runChecked(tscCommand);
  }

  private void doTestDeclarationSyntax(List<File> inputs) throws Exception {
    // This currently runs *all* test files as one test case. This gives less insight into errors,
    // but improves runtime as TypeScript only has to read its lib.d.ts once, amortizing the cost
    // across test cases.
    List<String> goldenFilePaths = new ArrayList<>();
    for (File input : inputs) {
      goldenFilePaths.add(DeclarationGeneratorTests.getGoldenFile(input, ".d.ts").getPath());
    }

    List<String> tscCommand = Lists.newArrayList(TSC.toString());
    tscCommand.addAll(TSC_FLAGS);
    tscCommand.add("src/resources/closure.lib.d.ts");

    tscCommand.addAll(goldenFilePaths);
    runChecked(tscCommand);
  }

  @Test
  public void testDeclarationUsage() throws Exception {
    doTestDeclarationUsage(TS_SOURCES);
  }

  private void doTestDeclarationUsage(FilenameFilter filenameFilter) throws Exception {
    List<File> inputs = DeclarationGeneratorTests.getTestInputFilesNoPartial(filenameFilter);
    final List<String> tscCommand = Lists.newArrayList(TSC.toString(), "-m", "commonjs");
    tscCommand.addAll(TSC_FLAGS);

    tscCommand.add("src/resources/closure.lib.d.ts");

    for (File input : inputs) {
      tscCommand.add(input.getPath());
    }
    runChecked(tscCommand);
  }

  public static void runChecked(final List<String> command) throws Exception {
    System.out.println("Executing tsc command: " + Joiner.on(" ").join(command));
    final Process tsc = new ProcessBuilder().command(command).redirectErrorStream(true).start();
    if (!tsc.waitFor(5, TimeUnit.SECONDS)) {
      tsc.destroyForcibly();
    }
    if (tsc.exitValue() != 0) {
      InputStreamReader isr = new InputStreamReader(tsc.getInputStream(), Charsets.UTF_8);
      String consoleOut = CharStreams.toString(isr);
      fail("tsc exited abnormally with code " + tsc.exitValue() + "\n" + consoleOut);
    }
  }
}
