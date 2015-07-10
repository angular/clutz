package com.google.javascript.jscomp;

import static com.google.javascript.jscomp.ProgramSubject.assertThatProgram;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

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

@RunWith(AllTests.class)
public class DeclarationGeneratorTests {

  public static TestSuite suite() throws IOException {
    TestSuite suite = new TestSuite(DeclarationGeneratorTests.class.getName());

    List<File> testFiles = getTestInputFiles();
    for (final File input : testFiles) {
      File golden = getGoldenFile(input);
      final String inputText = getTestFileText(input);
      final String goldenText = getTestFileText(golden);
      suite.addTest(new DeclarationTest(input.getName(), goldenText, inputText));
    }
    return suite;
  }

  static File getGoldenFile(final File input) {
    return new File(input.getPath().replaceAll("\\.js$", ".d.ts"));
  }

  static List<File> getTestInputFiles() {
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = DeclarationGeneratorTests.class.getPackage().getName();
    Path testPackage = testDir.resolve(packageName.replace('.', File.separatorChar));

    File[] testFiles = testPackage.toFile().listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.endsWith(".js");
      }
    });
    return Arrays.asList(testFiles);
  }

  private static String getTestFileText(final File input) throws IOException {
    String text = Files.asCharSource(input, Charsets.UTF_8).read();
    // Strip test comments starting with '//!!'.
    return text.replaceAll("^\\s*//!!.*\\n", "");
  }

  private static final class DeclarationTest implements Test, Describable {
    private final String testName;
    private final String goldenText;
    private final String inputText;

    private DeclarationTest(String testName, String goldenText, String inputText) {
      this.testName = testName;
      this.goldenText = goldenText;
      this.inputText = inputText;
    }

    @Override
    public void run(TestResult result) {
      result.startTest(this);
      try {
        assertThatProgram(inputText).generatesDeclarations(goldenText);
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
