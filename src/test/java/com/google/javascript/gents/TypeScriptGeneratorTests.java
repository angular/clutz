package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;

import com.google.common.base.Charsets;
import com.google.common.collect.ImmutableMap;
import com.google.common.io.Files;
import com.google.javascript.clutz.DeclarationGeneratorTests;
import com.google.javascript.gents.TypeScriptGenerator.GentsResult;
import com.google.javascript.jscomp.SourceFile;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import junit.framework.TestResult;
import junit.framework.TestSuite;
import org.junit.runner.Describable;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.junit.runners.AllTests;

@RunWith(AllTests.class)
public class TypeScriptGeneratorTests {

  static final String singleTestPath = "singleTests";

  static final String TEST_EXTERNS_MAP =
      TypeScriptGeneratorTests.getTestDirPath("test_externs_map.json").toString();

  public static TestSuite suite() throws IOException {
    // Map of test filename -> Options for tests which need a specific set of options
    final Map<String, Options> testOptionsMap =
        ImmutableMap.<String, Options>builder()
            .put("externs_map.js", new Options(TypeScriptGeneratorTests.TEST_EXTERNS_MAP))
            .build();

    TestSuite suite = new TestSuite(TypeScriptGeneratorTests.class.getName());

    List<File> testFiles = getTestInputFiles(DeclarationGeneratorTests.JS, singleTestPath);
    for (final File input : testFiles) {
      File goldenFile = DeclarationGeneratorTests.getGoldenFile(input, ".ts");
      Options options = testOptionsMap.get(input.getName());
      suite.addTest(new GoldenFileTest(input.getName(), goldenFile, input, options));
    }
    return suite;
  }

  static List<File> getTestInputFiles(FilenameFilter filter, String... dir) {
    File[] testFiles = getTestDirPath(dir).toFile().listFiles(filter);
    return Arrays.asList(testFiles);
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
    String packageName = TypeScriptGeneratorTests.class.getPackage().getName();
    return testDir.resolve(packageName.replace('.', File.separatorChar));
  }

  static String getFileText(final File input) throws IOException {
    String text = Files.asCharSource(input, Charsets.UTF_8).read();
    String cleanText =
        DeclarationGeneratorTests.GOLDEN_FILE_COMMENTS_REGEXP.matcher(text).replaceAll("");
    return cleanText;
  }

  private static final class GoldenFileTest implements junit.framework.Test, Describable {

    private final String testName;
    private final File sourceFile;
    private final File goldenFile;
    private final Options testOptions;

    private GoldenFileTest(String testName, File goldenFile, File sourceFile, Options testOptions) {
      this.testName = testName;
      this.goldenFile = goldenFile;
      this.sourceFile = sourceFile;

      if (testOptions == null) {
        this.testOptions = new Options();
      } else {
        this.testOptions = testOptions;
      }
    }

    @Override
    public void run(TestResult result) {
      result.startTest(this);

      TypeScriptGenerator gents;
      try {
        gents = new TypeScriptGenerator(this.testOptions);

        String basename = gents.pathUtil.getFilePathWithoutExtension(sourceFile.getName());
        String sourceText = getFileText(sourceFile);
        String goldenText = getFileText(goldenFile);

        ByteArrayOutputStream errStream = new ByteArrayOutputStream();
        gents.setErrorStream(new PrintStream(errStream));

        GentsResult gentsResult =
            gents.generateTypeScript(
                Collections.singleton(sourceFile.getName()),
                Collections.singletonList(SourceFile.fromCode(sourceFile.getName(), sourceText)),
                Collections.<SourceFile>emptyList());
        Map<String, String> transpiledSource = gentsResult.sourceFileMap;

        String errors = new String(errStream.toByteArray(), StandardCharsets.UTF_8);
        assertThat(errors).isEmpty();
        assertThat(gents.hasErrors()).isFalse();

        assertThat(transpiledSource).hasSize(1);
        assertThat(transpiledSource).containsKey(basename);
        assertThat(transpiledSource.get(basename)).isEqualTo(goldenText);
      } catch (Throwable t) {
        result.addError(this, t);
      } finally {
        result.endTest(this);
      }
    }

    @Override
    public int countTestCases() {
      return 1;
    }

    @Override
    public String toString() {
      return testName;
    }

    @Override
    public Description getDescription() {
      return Description.createTestDescription(TypeScriptGeneratorTests.class, testName);
    }
  }
}
