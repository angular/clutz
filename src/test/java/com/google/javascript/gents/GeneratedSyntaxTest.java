package com.google.javascript.gents;

import static com.google.javascript.clutz.DeclarationGeneratorTests.D_TS;
import static com.google.javascript.clutz.DeclarationGeneratorTests.TS_SOURCES;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Lists;
import com.google.javascript.clutz.DeclarationSyntaxTest;
import java.io.File;
import java.io.FilenameFilter;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * A test that uses {@code tsc} to compile the generated {@code .ts} files as a sanity check to make
 * sure that we actually output valid TypeScript.
 */
@RunWith(JUnit4.class)
public class GeneratedSyntaxTest {
  /*
   * Ideally we want to generate both idiomatic and valid TypeScript code. But in some cases we
   * choose to emit idiomatic TS and sacrifice the correctness.
   */
  private static final ImmutableSet<String> EXCLUDED_TS =
      ImmutableSet.of("classes.ts", "module_namespace.ts", "static_methods.ts", "proto_methods.ts");

  private static final FilenameFilter COMPILABLE_TS_SOURCES =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return TS_SOURCES.accept(dir, name)
              && !D_TS.accept(dir, name)
              && !EXCLUDED_TS.contains(name);
        }
      };

  private static final ImmutableList<String> TSC_FLAGS =
      ImmutableList.of(
          "--noEmit",
          "--skipDefaultLibCheck",
          "--lib",
          "es5,dom,es2015.iterable",
          "--strictNullChecks");

  // TODO(bowenni): Supports multiFileTests. Currently only compiles singleTests.
  @Test
  public void testGenerated() throws Exception {
    List<File> tsInputs =
        TypeScriptGeneratorTests.getTestInputFiles(
            COMPILABLE_TS_SOURCES, TypeScriptGeneratorTests.singleTestPath);
    List<File> dtsInputs =
        TypeScriptGeneratorTests.getTestInputFiles(D_TS, TypeScriptGeneratorTests.singleTestPath);
    List<String> tscCommand = null;

    for (File tsInput : tsInputs) {
      tscCommand = Lists.newArrayList(DeclarationSyntaxTest.TSC.toString(), "-m", "commonjs");
      tscCommand.addAll(TSC_FLAGS);
      tscCommand.add(tsInput.getPath());
      // Optional declarations to support some types needed for compilation.
      File dtsInput = getHelperDTS(tsInput, dtsInputs);
      if (dtsInput != null) {
        tscCommand.add(dtsInput.getPath());
      }
      DeclarationSyntaxTest.runChecked(tscCommand);
    }
  }

  private static File getHelperDTS(File tsInput, List<File> dtsInputs) {
    String filename = tsInput.getName();
    for (File dtsInput : dtsInputs) {
      String dtsFilename = filename.substring(0, filename.lastIndexOf('.')) + ".d.ts";
      if (dtsInput.getName().equals(dtsFilename)) {
        return dtsInput;
      }
    }
    return null;
  }
}
