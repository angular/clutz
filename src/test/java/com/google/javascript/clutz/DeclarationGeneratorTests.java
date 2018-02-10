package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import junit.framework.Test;
import junit.framework.TestResult;
import junit.framework.TestSuite;
import org.junit.runner.Describable;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.junit.runners.AllTests;

@RunWith(AllTests.class)
public class DeclarationGeneratorTests {
  /** Comments in .d.ts and .js golden files starting with '//!!' are stripped. */
  public static final Pattern GOLDEN_FILE_COMMENTS_REGEXP = Pattern.compile("(?m)^\\s*//!!.*\\n");

  public static final FilenameFilter JS =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return name.endsWith(".js");
        }
      };

  public static final FilenameFilter JS_NO_EXTERNS =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return name.endsWith(".js") && !name.endsWith(".externs.js");
        }
      };

  public static final FilenameFilter TS_SOURCES =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return name.endsWith(".ts");
        }
      };

  public static final FilenameFilter D_TS =
      new FilenameFilter() {
        @Override
        public boolean accept(File dir, String name) {
          return name.endsWith(".d.ts");
        }
      };

  public static final String PLATFORM_MARKER = "/** Insert general_with_platform.d.ts here */\n";

  public static TestSuite suite() throws IOException {
    TestSuite suite = new TestSuite(DeclarationGeneratorTests.class.getName());

    List<File> testFiles = getTestInputFiles(JS_NO_EXTERNS);
    for (final File input : testFiles) {
      File golden = getGoldenFile(input, ".d.ts");
      ProgramSubject subject = assertThatProgram(input);
      if (input.getName().contains("_with_platform")) {
        subject.withPlatform = true;
      }
      if (input.getName().contains("_output_base")) {
        subject.emitBase = true;
      }
      if (Arrays.asList("partial", "multifilePartial", "partialCrossModuleTypeImports")
          .contains(input.getParentFile().getName())) {
        subject.partialInput = true;
      }
      if (input.getParentFile().getName().equals("partialCrossModuleTypeImports")) {
        subject.depgraph = "partialCrossModuleTypeImports/cross_module_type.depgraph";
      }
      subject.extraExternFile = getExternFileNameOrNull(input.getName());
      suite.addTest(new DeclarationTest(input.getName(), golden, subject));
    }
    return suite;
  }

  public static File getGoldenFile(final File input, String ext) {
    return new File(input.getPath().replaceAll("\\.js$", ext));
  }

  static String getExternFileNameOrNull(String testFileName) {
    String possibleFileName = testFileName.replace(".js", ".externs.js");
    Path externFile = getPackagePath().resolve(possibleFileName);
    return externFile.toFile().exists() ? externFile.toString() : null;
  }

  public static List<File> getTestInputFiles(FilenameFilter filter) {
    File[] testFiles = getPackagePath().toFile().listFiles(filter);
    // Partial files live in 'partial' dir and run implicitly with the --partialInput option on.
    File[] testPartialFiles = getPackagePath().resolve("partial").toFile().listFiles(filter);
    // Test files that live in the 'multifilePartial' dir, and run with the --partialInput option
    // The resulting .d.ts files are checked with a DeclarationSyntaxTest, and they're also
    // compiled in a single run in MultiFileTest
    File[] testMultifilePartailFiles =
        getPackagePath().resolve("multifilePartial").toFile().listFiles(filter);
    // Test files that live in the 'testPartialCrossModuleTypeImportsFiles' dir, and run with the
    // --partialInput and --googProvides options.  The resulting .d.ts files are checked with a
    // DeclarationSyntaxTest, and they're also compiled in a single run in MultiFileTest
    File[] testPartialCrossModuleTypeImportsFiles =
        getPackagePath().resolve("partialCrossModuleTypeImports").toFile().listFiles(filter);
    // Output base files live in the 'outputBase' dir and impilicitly have base.js in their roots
    File[] testOutputBaseFiles = getPackagePath().resolve("outputBase").toFile().listFiles(filter);
    List<File> filesList = Lists.newArrayList(testFiles);
    filesList.addAll(Arrays.asList(testPartialFiles));
    filesList.addAll(Arrays.asList(testMultifilePartailFiles));
    filesList.addAll(Arrays.asList(testPartialCrossModuleTypeImportsFiles));
    filesList.addAll(Arrays.asList(testOutputBaseFiles));
    return filesList;
  }

  public static List<File> getTestInputFilesNoPartial(FilenameFilter filter) {
    File[] testFiles = getPackagePath().toFile().listFiles(filter);
    return Arrays.asList(testFiles);
  }

  static Path getTestInputFile(String fileName) {
    return getPackagePath().resolve(fileName);
  }

  private static Path getPackagePath() {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = DeclarationGeneratorTests.class.getPackage().getName();
    return testDir.resolve(packageName.replace('.', File.separatorChar));
  }

  static String getTestFileText(final File input) throws IOException {
    String text = Files.asCharSource(input, Charsets.UTF_8).read();
    if (input.getName().endsWith("_with_platform.d.ts")) {
      File platformGolden = getPackagePath().resolve("general_with_platform.d.ts").toFile();
      String platformGoldenText = Files.asCharSource(platformGolden, Charsets.UTF_8).read();
      if (text.contains(PLATFORM_MARKER)) {
        text = text.replace(PLATFORM_MARKER, platformGoldenText);
      } else {
        text += platformGoldenText;
      }
    }
    return text;
  }

  private static final class DeclarationTest implements Test, Describable {
    private final String testName;
    private final ProgramSubject subject;
    private final File golden;

    private DeclarationTest(String testName, File golden, ProgramSubject subject) {
      this.testName = testName;
      this.golden = golden;
      this.subject = subject;
    }

    @Override
    public void run(TestResult result) {
      result.startTest(this);
      try {
        subject.generatesDeclarations(golden);
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
      return Description.createTestDescription(DeclarationGeneratorTests.class, testName);
    }
  }
}
