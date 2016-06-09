package com.google.javascript.gents;

import com.google.common.collect.Lists;
import com.google.javascript.jscomp.SourceFile;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.google.common.truth.Truth.assertThat;

public class TypeScriptGeneratorTest {

  private TypeScriptGenerator gents;

  @Before
  public void setUp() {
    gents = new TypeScriptGenerator(new Options());
  }

  private Map<String, String> runGents(SourceFile... srcFiles) {
    return gents.generateTypeScript(Lists.newArrayList(srcFiles), new ArrayList<SourceFile>());
  }

  @Test
  public void testSingleFile() throws Exception {
    Map<String, String> result = runGents(
        SourceFile.fromCode("foo", "/** @type {number} */ var x = 4;")
    );
    assertThat(result).hasSize(1);
    assertThat(result).containsEntry("foo", "var x: number = 4;\n");
  }

  @Test
  public void testMultiFile() throws Exception {
    Map<String, String> result = runGents(
        SourceFile.fromCode("foo", "/** @type {number} */ var x = 4;"),
        SourceFile.fromCode("bar", "/** @const {string} */ var y = \"hello\";")
    );
    assertThat(result).hasSize(2);
    assertThat(result).containsEntry("bar", "var y: string = \"hello\";\n");
    assertThat(result).containsEntry("foo", "var x: number = 4;\n");
  }

  @Test
  public void testFileNameTrimming() {
    String filepath = "/this/is/a/path/to/../foo.bar";
    String filename = TypeScriptGenerator.getFileNameWithoutExtension(filepath);
    assertThat(filename).isEqualTo("foo");
  }
}
