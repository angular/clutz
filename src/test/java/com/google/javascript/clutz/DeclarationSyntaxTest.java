package com.google.javascript.clutz;

import static com.google.javascript.clutz.DeclarationGeneratorTests.JS_NO_EXTERNS;
import static com.google.javascript.clutz.DeclarationGeneratorTests.TS_SOURCES;
import static org.junit.Assert.fail;

import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.CharStreams;

import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.io.FilenameFilter;
import java.io.InputStreamReader;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * A test that checks the syntax of all {@code .d.ts} files using {@code tsc}, as a sanity check.
 */
public class DeclarationSyntaxTest {
  private static final FilenameFilter TS_SOURCES_WITHOUT_PLATFORM_EXTERNS = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return TS_SOURCES.accept(dir, name) && !name.contains("_emit_platform_externs");
    }
  };

  private static final FilenameFilter TS_SOURCES_WITH_PLATFORM_EXTERNS = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return TS_SOURCES.accept(dir, name) && name.contains("_emit_platform_externs");
    }
  };

  private static final FilenameFilter JS_NO_EXTERNS_WITHOUT_PLATFORM_EXTERNS = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return JS_NO_EXTERNS.accept(dir, name) && !name.contains("_emit_platform_externs");
    }
  };

  private static final FilenameFilter JS_NO_EXTERNS_WITH_PLATFORM_EXTERNS = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return JS_NO_EXTERNS.accept(dir, name) && name.contains("_emit_platform_externs");
    }
  };

  static final Path TSC = FileSystems.getDefault()
      .getPath("node_modules", "typescript", "bin", "tsc");

  @BeforeClass
  public static void setUpTsc() throws Exception {
    if (!TSC.toFile().exists()) {
      System.err.println("Installing typescript...");
      runChecked("npm", "install", "typescript@1.8.7");
    }
  }

  @Test
  public void testDeclarationSyntax() throws Exception {
    doTestDeclarationSyntaxWithPlatformExterns(JS_NO_EXTERNS_WITHOUT_PLATFORM_EXTERNS);
  }


  @Test
  public void testDeclarationSyntaxWithPlatformExterns() throws Exception {
    doTestDeclarationSyntaxWithPlatformExterns(JS_NO_EXTERNS_WITH_PLATFORM_EXTERNS);
  }

  private void doTestDeclarationSyntaxWithPlatformExterns(FilenameFilter filenameFilter)
      throws Exception {
    // This currently runs *all* test files as one test case. This gives less insight into errors,
    // but improves runtime as TypeScript only has to read its lib.d.ts once, amortizing the cost
    // across test cases.
    List<File> inputs =
        DeclarationGeneratorTests.getTestInputFiles(filenameFilter);
    List<String> goldenFilePaths = new ArrayList<>();
    for (File input : inputs) {
      goldenFilePaths.add(DeclarationGeneratorTests.getGoldenFile(input).getPath());
    }

    List<String> tscCommand =
        Lists.newArrayList(TSC.toString(), "--noEmit", "--skipDefaultLibCheck", "--noImplicitAny");
    tscCommand.add("src/resources/closure.lib.d.ts");

    tscCommand.addAll(goldenFilePaths);
    runChecked(tscCommand);
  }


  @Test
  public void testDeclarationUsage() throws Exception {
    doTestDeclarationUsage(TS_SOURCES_WITHOUT_PLATFORM_EXTERNS);
  }

  @Test
  public void testDeclarationUsageWithPlatformExterns() throws Exception {
    doTestDeclarationUsage(TS_SOURCES_WITH_PLATFORM_EXTERNS);
  }

  private void doTestDeclarationUsage(FilenameFilter filenameFilter) throws Exception {
    List<File> inputs = DeclarationGeneratorTests.getTestInputFiles(filenameFilter);
    final List<String> tscCommand =
        Lists.newArrayList(TSC.toString(), "--noEmit", "--skipDefaultLibCheck", "--noImplicitAny",
            "-m", "commonjs");

    tscCommand.add("src/resources/closure.lib.d.ts");

    for (File input : inputs) {
      tscCommand.add(input.getPath());
    }
    runChecked(tscCommand);
  }

  private static void runChecked(String... command) throws Exception {
    runChecked(Arrays.asList(command));
  }

  private static void runChecked(final List<String> command) throws Exception {
    // TODO(martinprobst): Use waitFor(n, TimeUnit.SECONDS) and .destroyForcibly once we moved to
    // Java 1.8.
    final Process tsc = new ProcessBuilder().command(command).redirectErrorStream(true).start();
    if (tsc.waitFor() != 0) {
      InputStreamReader isr = new InputStreamReader(tsc.getInputStream(), Charsets.UTF_8);
      String consoleOut = CharStreams.toString(isr);
      fail(command + ": exited abnormally with code " + tsc.exitValue() + "\n" + consoleOut);
    }
  }
}
