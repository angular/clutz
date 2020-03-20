package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertThat;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.collect.Lists;
import com.google.javascript.clutz.DeclarationGeneratorTest;
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
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class TypeScriptGeneratorTest {

  static final String singleTestPath = "singleTests";

  static final String TEST_EXTERNS_MAP =
      TypeScriptGeneratorTest.getTestDirPath("test_externs_map.json").toString();

  @Parameters(name = "{index}: {0}")
  public static Iterable<File> testCases() {
    return getTestInputFiles(DeclarationGeneratorTest.JS_NO_EXTERNS_OR_ZIP, singleTestPath);
  }

  static List<File> getTestInputFiles(FilenameFilter filter, String... dir) {
    File[] testFiles = getTestDirPath(dir).toFile().listFiles(filter);
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
    String text = SourceFile.fromFile(input.getPath(), UTF_8).getCode();
    String cleanText =
        DeclarationGeneratorTest.GOLDEN_FILE_COMMENTS_REGEXP.matcher(text).replaceAll("");
    return cleanText;
  }

  private final File input;

  public TypeScriptGeneratorTest(File input) {
    this.input = input;
  }

  @Test
  public void runTest() throws Exception {
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

    TypeScriptGenerator gents = new TypeScriptGenerator(options);

    String basename = gents.pathUtil.getFilePathWithoutExtension(input.getName());
    String sourceText = getFileText(input);
    File goldenFile = DeclarationGeneratorTest.getGoldenFile(input, ".ts");
    String goldenText = getFileText(goldenFile);

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
    assertThat(transpiledSource.get(basename)).isEqualTo(goldenText);
  }
}
