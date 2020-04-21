package com.google.javascript.gents.pass.comments;

import static com.google.common.truth.Truth.assertThat;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class AstCommentLinkingPassTest {

  @Test
  public void splitAndFilterCommentText() {
    final String input =
        "// comment 1\n" // offset 0
            + "\n"
            + "// comment 2\n" // offset 14
            + "// comment 3\n" // offset 27
            + "\n"
            + "\n"
            + "// comment 4\n" // offset 42
            + "/**\n" // offset 55
            + " * comment 5\n"
            + " * ...\n"
            + " */\n"
            + "  // comment 6\n" // offset 85
            + "\n"
            + "\n"
            + "/*\n" // offset 100
            + " * comment 7\n"
            + " */\n"
            + "\n"
            + "\n"
            + "/* comment 8 */\n" // offset 122
            + "     \n"
            + "// comment 9"; // offset 144
    final int startOffset = 10;
    List<GeneralComment> comments =
        AstCommentLinkingPass.splitAndFilterCommentText(input, startOffset);
    assertThat(comments.size()).isEqualTo(9);
    assertThat(comments.get(0)).isEqualTo(GeneralComment.from("// comment 1", startOffset));
    assertThat(comments.get(1)).isEqualTo(GeneralComment.from("// comment 2", 14 + startOffset));
    assertThat(comments.get(2)).isEqualTo(GeneralComment.from("// comment 3", 27 + startOffset));
    assertThat(comments.get(3)).isEqualTo(GeneralComment.from("// comment 4", 42 + startOffset));
    assertThat(comments.get(4))
        .isEqualTo(
            GeneralComment.from("/**\n" + " * comment 5\n" + " * ...\n" + " */", 55 + startOffset));
    assertThat(comments.get(5)).isEqualTo(GeneralComment.from("// comment 6", 85 + startOffset));
    assertThat(comments.get(6))
        .isEqualTo(GeneralComment.from("/*\n" + " * comment 7\n" + " */", 100 + startOffset));
    assertThat(comments.get(7))
        .isEqualTo(GeneralComment.from("/* comment 8 */", 122 + startOffset));
    assertThat(comments.get(8)).isEqualTo(GeneralComment.from("// comment 9", 144 + startOffset));
  }
}
