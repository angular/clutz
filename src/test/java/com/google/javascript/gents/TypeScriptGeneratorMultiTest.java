package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.javascript.clutz.DeclarationGeneratorTest;
import com.google.javascript.gents.ModuleRenameLogger.LogItem;
import com.google.javascript.gents.TestUtil.TestInput;
import com.google.javascript.gents.TypeScriptGenerator.GentsResult;
import com.google.javascript.gents.experimental.ExperimentTracker;
import com.google.javascript.jscomp.SourceFile;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.NoSuchFileException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class TypeScriptGeneratorMultiTest {

  private static class MultiTestConfig {
    private final ExperimentTracker experimentTracker;
    private final File dir;
    private final List<TestInput> testInputs;

    MultiTestConfig(ExperimentTracker experimentTracker, File dir, List<TestInput> testInputs) {
      this.experimentTracker = experimentTracker;
      this.dir = dir;
      this.testInputs = testInputs;
    }

    public File getLogFile() {
      File root = dir;
      if (experimentTracker.hasEnabledExperiments()) {
        root = new File(dir, "experimental");
      }
      return root.toPath().resolve("log.json").toFile();
    }

    /**
     * The result from this method is displayed as the text describing a test. This is overridden to
     * express the directory of the group of files being tested as well whether the test does or
     * does not have experiments enabled.
     */
    @Override
    public String toString() {
      String result = dir.getName();
      if (experimentTracker.hasEnabledExperiments()) {
        return result + " (Experimental)";
      }
      return result;
    }
  }

  static final String multiTestPath = "multiTests";

  // These test are exempt from checking if they include a good.module or goog.provide
  // declaration to maintain the current state of the tests as they were when this CL
  // was created (March 20, 2020).
  private static final ImmutableSet<String> GOOG_MODULE_PROVIDE_EXCEPTIONS =
      ImmutableSet.of(
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/basenames_dont_collide/a/file.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/basenames_dont_collide/b/file.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/converts_ts_module_require/converts_ts_module_require.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/goog_provide_rewrite/import.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/import_rewrite/import.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/jslib_imports/import_mixed_default_namespaces.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/module_imports/import.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/provide_imports/import.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/converts_ts_module_require/x/y/z/convert.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/jslib_imports/import_provided.js",
          "third_party/java_src/clutz/src/test/java/com/google/javascript/gents/multiTests/provide_imports/import_binding.js");

  public static final FilenameFilter DIR =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return new File(dir, name).isDirectory();
        }
      };

  @Parameters(name = "{index}: {0}")
  public static Iterable<MultiTestConfig> testCases() {
    List<MultiTestConfig> configs = Lists.newArrayList();
    for (File dir : TypeScriptGeneratorTest.getTestInputFiles(DIR, multiTestPath)) {
      List<File> testFiles =
          getTestInputFilesRecursive(DeclarationGeneratorTest.JS, multiTestPath, dir.getName());

      List<TestInput> inputs = Lists.newArrayList();
      for (File f : testFiles) {
        inputs.add(new TestInput(dir.getAbsolutePath(), TestUtil.getRelativePathTo(f, dir)));
      }

      configs.add(new MultiTestConfig(ExperimentTracker.withoutExperiments(), dir, inputs));

      /*
       * To specify that another experiment should be used, add the Experiment enum
       * value for that experiment in the withExperiments() method.
       */
      // To enable testing an experiment, replace SOME_EXPERIMENT with the experiment
      // enum value below and uncomment the next lines.
      // configs.add(
      //    new MultiTestConfig(
      //        ExperimentTracker.withExperiments(Experiment.SOME_EXPERIMENT), dir, inputs));
    }
    return configs;
  }

  private final MultiTestConfig config;

  public TypeScriptGeneratorMultiTest(MultiTestConfig config) {
    this.config = config;
  }

  @Test
  public void runTest() throws Exception {
    TypeScriptGenerator gents = new TypeScriptGenerator(new Options(), config.experimentTracker);

    Set<String> sourceNames = new HashSet<>();
    List<SourceFile> sourceFiles = new ArrayList<>();
    Map<TestInput, String> goldenFiles = new HashMap<>();

    for (final TestInput testInput : config.testInputs) {
      File sourceFile = testInput.getInputFile();
      String sourceText = TypeScriptGeneratorTest.getFileText(sourceFile);
      String filepath = TestUtil.getRelativePathToCwd(sourceFile);
      sourceFiles.add(SourceFile.fromCode(filepath, sourceText));

      if (!GOOG_MODULE_PROVIDE_EXCEPTIONS.contains(filepath)) {
        TestUtil.assertIsGoogModuleOrProvide(sourceText, filepath);
      }

      if (!filepath.endsWith("_keep.js") && !filepath.endsWith("_keep.es5.js")) {
        sourceNames.add(filepath);

        File goldenFile = testInput.getGoldenFile(config.experimentTracker);
        String goldenText;
        try {
          goldenText = TypeScriptGeneratorTest.getFileText(goldenFile);
        } catch (NoSuchFileException e) {
          // if the golden file doesn't exist but the golden files are
          // to updated, this is the first time the golden file is being
          // written so treat the existing gold text as being empty
          if (System.getenv("UPDATE_GOLDENS") != null) {
            goldenText = "";
          } else {
            throw e;
          }
        }
        goldenFiles.put(testInput, goldenText);
      }
    }

    ByteArrayOutputStream errStream = new ByteArrayOutputStream();
    gents.setErrorStream(new PrintStream(errStream));

    GentsResult gentsResult =
        gents.generateTypeScript(sourceNames, sourceFiles, Collections.emptyList());
    Map<String, String> transpiledSource = gentsResult.sourceFileMap;

    String errors = new String(errStream.toByteArray(), StandardCharsets.UTF_8);
    assertThat(errors).isEmpty();
    assertThat(gents.hasErrors()).isFalse();

    assertThat(transpiledSource).hasSize(sourceNames.size());
    for (TestInput testInput : goldenFiles.keySet()) {
      File sourceFile = testInput.getInputFile();
      String basename =
          gents.pathUtil.getFilePathWithoutExtension(TestUtil.getRelativePathToCwd(sourceFile));
      String goldenText;

      // If the test was run with the UPDATE_GOLDENS environment variable
      // set then the golden file should be updated.
      if (System.getenv("UPDATE_GOLDENS") != null) {
        File goldenFile = testInput.getGoldenFile(config.experimentTracker);
        goldenText = transpiledSource.get(basename);
        File goldenParent = goldenFile.getParentFile();
        if (goldenParent != null) {
          goldenParent.mkdirs();
        }
        Files.asCharSink(goldenFile, StandardCharsets.UTF_8).write(goldenText);

        /*
         * Prior to April 13, 2020, the only multi tests that had an associated log.json file
         * were the import_rewrite and module_imports tests.  The if statement below is used so
         * that if the multi-tests are regenerated, the log.json files are generated for only
         * those multi-tests.  Without the if statement, every multi-test will have a log.json
         * file generated which would change the tests.  This is because the addition of a log.json
         * file means that the log file will be tested (where it wasn't tested previously since
         * it did not exist).
         */
        if (config.dir.getName().equals("import_rewrite")
            || config.dir.getName().equals("module_imports")) {
          File logFile = config.getLogFile();
          File logParent = logFile.getParentFile();
          if (logParent != null) {
            logParent.mkdirs();
          }
          Files.asCharSink(logFile, StandardCharsets.UTF_8).write(gentsResult.moduleRewriteLog);
        }
      } else {
        goldenText = goldenFiles.get(testInput);
      }

      assertThat(transpiledSource).containsKey(basename);
      assertThat(transpiledSource.get(basename)).isEqualTo(goldenText);
    }
    File logFile = config.getLogFile();
    if (logFile.exists()) {
      String goldenLog = TypeScriptGeneratorTest.getFileText(logFile);
      // order independent comparison of the log entries.
      Set<LogItem> goldenLogItems =
          ImmutableSet.copyOf(new Gson().fromJson(goldenLog, LogItem[].class));
      Set<LogItem> emittedLogItems =
          ImmutableSet.copyOf(new Gson().fromJson(gentsResult.moduleRewriteLog, LogItem[].class));

      assertThat(emittedLogItems).isEqualTo(goldenLogItems);
    }
  }

  private static List<File> getTestInputFilesRecursive(FilenameFilter filter, String... dir) {
    ImmutableList.Builder<File> filesBuilder = ImmutableList.builder();

    for (File f :
        Files.fileTraverser()
            .depthFirstPreOrder(TypeScriptGeneratorTest.getTestDirPath(dir).toFile())) {
      if (filter.accept(f.getParentFile(), f.getName())) {
        filesBuilder.add(f);
      }
    }

    return filesBuilder.build();
  }
}
