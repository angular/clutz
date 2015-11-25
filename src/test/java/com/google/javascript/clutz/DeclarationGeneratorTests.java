package com.google.javascript.clutz;

import static com.google.javascript.clutz.ProgramSubject.assertThatProgram;

import com.google.common.base.Charsets;
import com.google.common.io.Files;
import com.google.javascript.clutz.ProgramSubject.Externs;

import junit.framework.Test;
import junit.framework.TestResult;
import junit.framework.TestSuite;

import org.junit.runner.Describable;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.junit.runners.AllTests;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@RunWith(AllTests.class)
public class DeclarationGeneratorTests {
  /** Comments in .d.ts and .js golden files starting with '//!!' are stripped. */
  static final Pattern GOLDEN_FILE_COMMENTS_REGEXP = Pattern.compile("(?m)^\\s*//!!.*\\n");

  public static final FilenameFilter JS = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return name.endsWith(".js");
    }
  };
  public static final FilenameFilter TS_SOURCES = new FilenameFilter() {
    @Override
    public boolean accept(File dir, String name) {
      return name.endsWith(".ts");
    }
  };

  public static TestSuite suite() throws IOException {
    TestSuite suite = new TestSuite(DeclarationGeneratorTests.class.getName());

    List<File> testFiles = getTestInputFiles(JS);
    for (final File input : testFiles) {
      File golden = getGoldenFile(input);
      final String goldenText = getTestFileText(golden);
      Externs externs = Externs.fromTestName(input.getName());
      ProgramSubject subject = assertThatProgram(input).withExterns(externs);
      suite.addTest(new DeclarationTest(input.getName(), goldenText, subject));
    }
    return suite;
  }

  static File getGoldenFile(final File input) {
    return new File(input.getPath().replaceAll("\\.js$", ".d.ts"));
  }

  static List<File> getTestInputFiles(FilenameFilter filter) {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = DeclarationGeneratorTests.class.getPackage().getName();
    Path testPackage = testDir.resolve(packageName.replace('.', File.separatorChar));

    File[] testFiles = testPackage.toFile().listFiles(filter);
    return Arrays.asList(testFiles);
  }

  static String getTestFileText(final File input) throws IOException {
    String text = Files.asCharSource(input, Charsets.UTF_8).read();
    return GOLDEN_FILE_COMMENTS_REGEXP.matcher(text).replaceAll("");
  }

  private static final class DeclarationTest implements Test, Describable {
    private final String testName;
    private final ProgramSubject subject;
    private final String goldenText;

    private DeclarationTest(String testName, String goldenText, ProgramSubject subject) {
      this.testName = testName;
      this.goldenText = goldenText;
      this.subject = subject;
    }

    @Override
    public void run(TestResult result) {
      result.startTest(this);
      try {
        subject.generatesDeclarations(goldenText);
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
