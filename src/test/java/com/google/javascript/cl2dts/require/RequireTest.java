package com.google.javascript.cl2dts.require;

import static com.google.common.truth.Truth.assertThat;
import static com.google.javascript.cl2dts.DeclarationGeneratorTests.JS;
import static com.google.javascript.cl2dts.DeclarationGeneratorTests.getTestInputFiles;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import com.google.common.io.Files;
import com.google.javascript.cl2dts.DeclarationGenerator;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.nio.file.FileSystems;
import java.nio.file.Path;

// TODO(alexeagle): should we have an explicit test class like this in each directory?
// Or should we auto-discover them as we do for test cases in the root directory?
@RunWith(JUnit4.class)
public class RequireTest {

  public static final Function<File, String> GET_ABSOLUTE_PATH = new Function<File, String>() {
    @Override
    public String apply(File input) {
      return input.getAbsolutePath();
    }
  };

  // TODO(alexeagle): also assert that the usage file compiles
  @Test
  public void testRequire() throws Exception {
    DeclarationGenerator.main(FluentIterable
        .from(getTestInputFiles(JS, RequireTest.class.getPackage()))
        .transform(GET_ABSOLUTE_PATH).toArray(String.class));
    Path testDir = FileSystems.getDefault().getPath("src", "test", "java");
    String packageName = getClass().getPackage().getName();
    Path testPackage = testDir.resolve(packageName.replace('.', File.separatorChar));

    File expected1 = testPackage.resolve("event_target_expected.d.ts").toFile();
    File actual1 = testPackage.resolve("event_target.d.ts").toFile();
    File expected2 = testPackage.resolve("autocomplete_expected.d.ts").toFile();
    File actual2 = testPackage.resolve("autocomplete.d.ts").toFile();

    assertThat(Files.toString(actual1, UTF_8)).isEqualTo(Files.toString(expected1, UTF_8));
    assertThat(Files.toString(actual2, UTF_8)).isEqualTo(Files.toString(expected2, UTF_8));
  }
}
