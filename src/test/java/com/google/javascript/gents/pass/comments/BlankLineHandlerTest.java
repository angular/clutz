package com.google.javascript.gents.pass.comments;

import static com.google.common.truth.Truth.assertThat;

import com.google.javascript.gents.pass.comments.BlankLineHandler.TextBlock;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class BlankLineHandlerTest {

  @Test
  public void getCommentBlocks() {
    final String input =
        "        \n"
            + "  \n"
            + "\n"
            + "goog.module('some.module');\n"
            + "\n"
            + "       \n"
            + "const x = 0;\n"
            + "const y = 1;\n"
            + "\n"
            + "// some comment\n"
            + "const z = 2;\n"
            + "     \n"
            + "// another comment\n"
            + "\n"
            + "a; /* A comment\n"
            + "    * on multiple\n"
            + "    * lines.\n"
            + "    */\n"
            + "const w = 3;\n"
            + "  \n"
            + "        \n"
            + "/** another comment\n"
            + " *  here.\n"
            + " */       \n"
            + "       \n"
            + "f(x /** string */)\n"
            + "/** a comment */\n";
    List<TextBlock> blocks = BlankLineHandler.getTextBlocks(input);
    assertThat(blocks).hasSize(3);
    assertThat(blocks.get(0)).isEqualTo(new TextBlock(14, 18));
    assertThat(blocks.get(1)).isEqualTo(new TextBlock(21, 24));
    assertThat(blocks.get(2)).isEqualTo(new TextBlock(26, 27));
  }

  @Test
  public void normalizeBlankLineInfo() {
    final String input =
        "x;// GENTS_BLANK_LINE_COUNT: 1\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 2\n"
            + "y;\n"
            + "\n"
            + "z; // GENTS_BLANK_LINE_COUNT: 3";
    final String expectedOutput =
        "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "x;\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 2\n"
            + "y;\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 3\n"
            + "z; ";
    final String output = BlankLineHandler.normalizeBlankLineInfo(input);
    assertThat(output).isEqualTo(expectedOutput);
  }

  @Test
  public void encodeBlankLineInformation() {
    final String input =
        "        \n"
            + "  \n"
            + "\n"
            + "goog.module('some.module');\n"
            + "\n"
            + "       \n"
            + "const x = 0;\n"
            + "const y = 1;\n"
            + "\n"
            + "// some comment\n"
            + "const z = 2;\n"
            + "     \n"
            + "// another comment\n"
            + "\n"
            + "/*\n"
            + " * A floating comment\n"
            + " */\n"
            + "\n"
            + "\n"
            + "a; /* A comment\n"
            + "    * on multiple\n"
            + "    * lines.\n"
            + "    */\n"
            + "const w = 3;\n"
            + "  \n"
            + "        \n"
            + "";
    final String expectedOutput =
        "        \n"
            + "  \n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 3\n"
            + "goog.module('some.module');\n"
            + "\n"
            + "       \n"
            + "// GENTS_BLANK_LINE_COUNT: 2\n"
            + "const x = 0;\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "const y = 1;\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "// some comment\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "const z = 2;\n"
            + "     \n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "// another comment\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "/*\n"
            + " * A floating comment\n"
            + " */\n"
            + "\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 2\n"
            + "a; /* A comment\n"
            + "    * on multiple\n"
            + "    * lines.\n"
            + "    */\n"
            + "const w = 3;\n"
            + "  \n"
            + "        \n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 3\n"
            + ";";
    String output = BlankLineHandler.encodeBlankLineInformation(input);
    assertThat(output).isEqualTo(expectedOutput);
  }

  @Test
  public void encodeNewlineInfoWithInlineComments() {
    final String input =
        "\n"
            + "/**\n"
            + " * This line says what the function does!\n"
            + " * @param {string} y\n"
            + " * @param {number} z\n"
            + " */\n"
            + "function /** string */ g(/** number */ x, y, z) {\n"
            + "  return x + y + ' apples' + z;\n"
            + "}";
    final String expectedOutput =
        "\n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "/**\n"
            + " * This line says what the function does!\n"
            + " * @param {string} y\n"
            + " * @param {number} z\n"
            + " */\n"
            + "function /** string */ g(/** number */ x, y, z) {\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "  return x + y + ' apples' + z;\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "}\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + ";";
    String output = BlankLineHandler.encodeBlankLineInformation(input);
    assertThat(output).isEqualTo(expectedOutput);
  }

  @Test
  public void decodeNewlineInformation() {
    final String input =
        "        \n"
            + "  \n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 3\n"
            + "goog.module('some.module');\n"
            + "\n"
            + "       \n"
            + "// GENTS_BLANK_LINE_COUNT: 2\n"
            + "const x = 0;\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "const y = 1;\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "// some comment\n"
            + "// GENTS_BLANK_LINE_COUNT: 0\n"
            + "const z = 2;\n"
            + "     \n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "// another comment\n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 1\n"
            + "const w = 3;\n"
            + "  \n"
            + "        \n"
            + "\n"
            + "// GENTS_BLANK_LINE_COUNT: 3\n"
            + ";";
    final String expectedOutput = "goog.module('some.module');\n"
            + "\n"
            + "\n"
            + "const x = 0;\n"
            + "const y = 1;\n"
            + "\n"
            + "// some comment\n"
            + "const z = 2;\n"
            + "\n"
            + "// another comment\n"
            + "\n"
            + "const w = 3;\n"
            + "\n"
            + "\n"
            + "\n;";
    String output = BlankLineHandler.decodeBlankLineInformation(input);
    assertThat(output).isEqualTo(expectedOutput);
  }

  @Test
  public void removesLeadingFileBlankLines() {
    final String input = "\n" + "\n" + "\n" + "const x = 0;\n\nconst y;";
    final String expectedOutput = "const x = 0;\n\nconst y;\n;";
    final String encoded = BlankLineHandler.encodeBlankLineInformation(input);
    final String decoded = BlankLineHandler.decodeBlankLineInformation(encoded);
    assertThat(decoded).isEqualTo(expectedOutput);
  }
}
