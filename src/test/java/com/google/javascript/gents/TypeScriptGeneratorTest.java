package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.javascript.clutz.DeclarationGeneratorTest;
import com.google.javascript.gents.TestUtil.TestInput;
import com.google.javascript.gents.TypeScriptGenerator.GentsResult;
import com.google.javascript.gents.experimental.ExperimentTracker;
import com.google.javascript.gents.experimental.ExperimentTracker.Experiment;
import com.google.javascript.jscomp.SourceFile;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class TypeScriptGeneratorTest {

  private static class SingleTestConfig {
    private final ExperimentTracker experimentTracker;
    private final TestInput testInput;

    SingleTestConfig(ExperimentTracker experimentTracker, TestInput testInput) {
      this.experimentTracker = experimentTracker;
      this.testInput = testInput;
    }

    /**
     * The result from this method is displayed as the text describing a test. This is overridden to
     * express the input file being transformed as well whether the test does or does not have
     * experiments enabled.
     */
    @Override
    public String toString() {
      String result = testInput.getRelativePath();
      if (experimentTracker.hasEnabledExperiments()) {
        return result + " (experimental)";
      }
      return result;
    }
  }

  static final String singleTestPath = "singleTests";

  static final String TEST_EXTERNS_MAP =
      TypeScriptGeneratorTest.getTestDirPath("test_externs_map.json").toString();

  @Parameters(name = "Test {index}: {0}")
  public static Iterable<SingleTestConfig> testCases() throws IOException {
    List<SingleTestConfig> configs = Lists.newArrayList();
    List<File> testInputFiles =
        getTestInputFiles(DeclarationGeneratorTest.JS_NO_EXTERNS_OR_ZIP, singleTestPath);
    File inputFileRoot = getTestDirPath(singleTestPath).toFile().getCanonicalFile();
    for (File file : testInputFiles) {
      TestInput input =
          new TestInput(
              inputFileRoot.getAbsolutePath(), TestUtil.getRelativePathTo(file, inputFileRoot));

      configs.add(new SingleTestConfig(ExperimentTracker.withoutExperiments(), input));

      /*
       * To specify that another experiment should be used, add the Experiment enum
       * value for that experiment in the withExperiments() method.
       */
      configs.add(
          new SingleTestConfig(
              ExperimentTracker.withExperiments(Experiment.USE_NODE_COMMENTS), input));
    }
    return configs;
  }

  static List<File> getTestInputFiles(FilenameFilter filter, String... dir) {
    File baseDir = getTestDirPath(dir).toAbsolutePath().toFile();

    File[] testFiles = baseDir.listFiles(filter);
    List<File> filesList = Lists.newArrayList(testFiles);

    return DeclarationGeneratorTest.expandZipTestInputFiles(filesList);
  }

  static Path getTestDirPath(String... testDir) {
    Path p = getPackagePath();
    for (String dir : testDir) {
      p = p.resolve(dir);
    }
    return p;
  }

  static final String SOURCE_ROOT = "";

  static Path getPackagePath() {
    Path root = FileSystems.getDefault().getPath(SOURCE_ROOT);
    Path testDir = root.resolve("src").resolve("test").resolve("java");
    String packageName = TypeScriptGeneratorTest.class.getPackage().getName();
    return testDir.resolve(packageName.replace('.', File.separatorChar));
  }

  static String getFileText(final File input) throws IOException {
    // SourceFile handles <zipfile>!<jsfile> paths internally.
    return SourceFile.fromFile(input.getPath(), UTF_8).getCode();
  }

  private final SingleTestConfig config;

  public TypeScriptGeneratorTest(SingleTestConfig config) {
    this.config = config;
  }

  @Test
  public void runTest() throws Exception {
    File input = config.testInput.getInputFile();
    Options options;
    if (input.getName().equals("externs_map.js")) {
      options = new Options(TypeScriptGeneratorTest.TEST_EXTERNS_MAP);
    } else if (input.getName().equals("externs_override.js")) {
      options =
          new Options(
              TypeScriptGeneratorTest.TEST_EXTERNS_MAP,
              Lists.newArrayList("any:AnyDuringTs37Migration"));
    } else {
      options = new Options();
    }

    TypeScriptGenerator gents = new TypeScriptGenerator(options, config.experimentTracker);

    String basename = gents.pathUtil.getFilePathWithoutExtension(input.getName());
    String sourceText = getFileText(input);
    File goldenFile = config.testInput.getGoldenFile(config.experimentTracker);

    // * The 'empty' test does not need a goog.module declaration because it
    //   is for verifying a file that contains no contents
    // * The 'js_doc_comments" test does not need a goog.module declaration
    //   because it is for verifying a file that contains only JSDoc comments.
    if (!basename.equals("empty") && !basename.equals("js_doc_comments")) {
      TestUtil.assertIsGoogModuleOrProvide(sourceText, basename);
    }

    ByteArrayOutputStream errStream = new ByteArrayOutputStream();
    gents.setErrorStream(new PrintStream(errStream));

    GentsResult gentsResult =
        gents.generateTypeScript(
            Collections.singleton(input.getName()),
            Collections.singletonList(SourceFile.fromCode(input.getName(), sourceText)),
            Collections.emptyList());
    Map<String, String> transpiledSource = gentsResult.sourceFileMap;

    String errors = new String(errStream.toByteArray(), StandardCharsets.UTF_8);
    assertThat(errors).isEmpty();
    assertThat(gents.hasErrors()).isFalse();

    assertThat(transpiledSource).hasSize(1);
    assertThat(transpiledSource).containsKey(basename);

    String transpiledOutput = transpiledSource.get(basename);

    // If the test was run with the UPDATE_GOLDENS environment variable
    // set then the golden file should be updated.
    if (System.getenv("UPDATE_GOLDENS") != null) {
      File parent = goldenFile.getParentFile();
      if (parent != null && !parent.exists()) {
        parent.mkdirs();
      }
      Files.asCharSink(goldenFile, StandardCharsets.UTF_8).write(transpiledOutput);
    }

    String goldenText = getFileText(goldenFile);
    assertThat(transpiledOutput).isEqualTo(goldenText);
  }
}
