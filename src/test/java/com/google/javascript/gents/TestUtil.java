package com.google.javascript.gents;

import static com.google.common.truth.Truth.assertWithMessage;

import com.google.javascript.clutz.DeclarationGeneratorTest;
import com.google.javascript.gents.experimental.ExperimentTracker;
import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayDeque;

public class TestUtil {
  private TestUtil() {}

  public static void assertIsGoogModuleOrProvide(String sourceText, String testName) {
    boolean hasGoogModule = hasStartingCall(sourceText, "goog.module(");
    boolean hasGoogProvide = hasStartingCall(sourceText, "goog.provide(");
    assertWithMessage(
            "The input file for test '"
                + testName
                + "' must specify a goog.module or goog.provide to avoid clashing with other tests"
                + " files")
        .that(hasGoogModule || hasGoogProvide)
        .isTrue();
  }

  private static boolean hasStartingCall(String sourceText, String call) {
    for (String line : sourceText.split("\n", -1)) {
      if (line.replaceAll("[ ]+", "").startsWith(call)) {
        return true;
      }
    }
    return false;
  }

  public static String getRelativePathToCwd(File file) {
    return getRelativePathTo(file, new File("").getAbsoluteFile());
  }

  public static String getRelativePathTo(File file, File relativeTo) {
    if (!relativeTo.isDirectory()) {
      throw new IllegalArgumentException(
          "Requested a path relative to non-directory " + relativeTo);
    }

    File tmp = file;
    ArrayDeque<String> parts = new ArrayDeque<>();
    while (tmp != null && !tmp.getAbsolutePath().equals(relativeTo.getAbsolutePath())) {
      parts.addFirst(tmp.getName());
      tmp = tmp.getParentFile();
    }

    StringBuilder builder = new StringBuilder();
    while (!parts.isEmpty()) {
      builder.append(parts.removeFirst());
      if (!parts.isEmpty()) {
        builder.append(File.separator);
      }
    }

    return builder.toString();
  }

  /**
   * Represents a single input file used for testing. This class abstracts the details for getting
   * the absolute path to the input file as well as the absolute path to its associated golden file
   * (either with or without experiments enabled).
   */
  public static class TestInput {
    private final String parentDir;
    private final String relativePath;

    public TestInput(String parentDir, String relativePath) {
      this.parentDir = parentDir;
      this.relativePath = relativePath;
    }

    public String getRelativePath() {
      return relativePath;
    }

    public File getInputFile() {
      return Paths.get(this.parentDir, this.relativePath).toFile();
    }

    public File getGoldenFile(ExperimentTracker tracker) {
      File input;
      if (tracker.hasEnabledExperiments()) {
        input = Paths.get(this.parentDir, "experimental", this.relativePath).toFile();
      } else {
        input = Paths.get(this.parentDir, this.relativePath).toFile();
      }
      return DeclarationGeneratorTest.normalizeAndReplaceExt(input, ".ts");
    }
  }
}
