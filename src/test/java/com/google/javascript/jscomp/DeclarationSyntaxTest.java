package com.google.javascript.jscomp;

import static org.junit.Assert.fail;

import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.CharStreams;

import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * A test that checks the syntax of all {@code .d.ts} files using {@code tsc}, as a sanity check.
 */
public class DeclarationSyntaxTest {

  static final Path TSC = FileSystems.getDefault().getPath("node_modules", "tsc", "bin", "tsc");

  @BeforeClass
  public static void setUpTsc() throws Exception {
    if (!TSC.toFile().exists()) {
      System.err.println("Installing tsc...");
      runChecked("npm", "install", "tsc");
    }
  }

  @Test
  public void testDeclarationSyntax() throws Exception {
    // This currently runs *all* test files as one test case. This gives less insight into errors,
    // but improves runtime as TypeScript only has to read its lib.d.ts once, amortizing the cost
    // across test cases.
    List<File> inputs = DeclarationGeneratorTests.getTestInputFiles();
    List<String> goldenFilePaths = new ArrayList<>();
    for (File input : inputs) {
      goldenFilePaths.add(DeclarationGeneratorTests.getGoldenFile(input).getPath());
    }

    final List<String> tscCommand = Lists.newArrayList(TSC.toString(), "--noEmit");
    tscCommand.addAll(goldenFilePaths);
    runChecked(tscCommand);
  }

  private static void runChecked(String... command) throws Exception {
    runChecked(Arrays.asList(command));
  }

  private static void runChecked(final List<String> command) throws Exception {
    Process tsc = new ProcessBuilder().command(command).redirectErrorStream(true).start();
    if (!tsc.waitFor(5, TimeUnit.SECONDS)) {
      tsc.destroyForcibly();
      fail(command + ": process timed out");
    } else if (tsc.exitValue() != 0) {
      InputStreamReader isr = new InputStreamReader(tsc.getInputStream(), Charsets.UTF_8);
      String consoleOut = CharStreams.toString(isr);
      fail(command + ": exited abnormally: " + tsc.exitValue() + " - " + consoleOut);
    }
  }
}
