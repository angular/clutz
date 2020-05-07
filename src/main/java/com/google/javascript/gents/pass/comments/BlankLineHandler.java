package com.google.javascript.gents.pass.comments;

import com.google.common.collect.Lists;
import java.util.List;
import java.util.Objects;

/**
 * This file contains methods used to encode and decode blank line information in source code. Here
 * a blank line is defined as a line contain only whitespace and tab characters.
 *
 * <p>In particular, in the encoding process, after each sequence of blank lines in the input code,
 * a comment is added that encodes the number of blank lines before the comment. The decoding
 * process then reads each comment that encodes the number of blank lines and adds or removes the
 * appropriate number of blank lines in the output to ensure the output has the correct number of
 * blank lines.
 */
public class BlankLineHandler {
  /** The prefix of the comment used encode the number of blank lines preceding the comment. */
  private static final String BLANK_LINE_SUMMARY_PREFIX = "// GENTS_BLANK_LINE_COUNT: ";

  /** Private to enforce static access. */
  private BlankLineHandler() {}

  /** Creates a comment that encodes the given number of blank lines. */
  private static String buildBlankLineSummary(int numBlankLines) {
    return BLANK_LINE_SUMMARY_PREFIX + numBlankLines;
  }

  /** Used to determine if a line encodes blank line information. */
  private static boolean isBlankLineSummary(String line) {
    return line.trim().startsWith(BLANK_LINE_SUMMARY_PREFIX);
  }

  /**
   * Used to get the number of blank lines encoded in the given line.
   *
   * @throws IllegalArgumentException Thrown if the given line does not encode blank line
   *     information.
   */
  private static int getBlankLineSummaryCount(String line) {
    if (!isBlankLineSummary(line)) {
      throw new IllegalArgumentException("Cannot get blank count for line: " + line);
    }

    return Integer.parseInt(line.trim().substring(BLANK_LINE_SUMMARY_PREFIX.length()));
  }

  /** Used to determine if the given line is a "blank line". */
  private static boolean isBlank(String str) {
    return str.trim().isEmpty();
  }

  /**
   * Used to ensure any special blank line encoding comment occurs on its own line without any other
   * content on the line.
   *
   * <p>That is,
   *
   * <pre>
   *   x;
   *   y; // GENTS_BLANK_LINE_COUNT:0
   *   z;
   * </pre>
   *
   * is converted to
   *
   * <pre>
   *   x;
   *   y;
   *   // GENTS_BLANK_LINE_COUNT: 0
   *   z;
   * </pre>
   *
   * This is needed because when Gents processes input code, it can change
   *
   * <pre>
   *   x;
   *   // GENTS_BLANK_LINE_COUNT: 0
   *   y;
   * </pre>
   *
   * to
   *
   * <pre>
   *   x; // GENTS_BLANK_LINE_COUNT: 0
   *   y;
   * </pre>
   *
   * This is needed because the code in this class assumes
   *
   * <pre>// GENTS_BLANK_LINE_COUNT:</pre>
   *
   * comments occur on their own lines.
   */
  static String normalizeBlankLineInfo(String text) {
    StringBuilder builder = new StringBuilder();
    String[] lines = text.split("\n", -1);
    for (int i = 0; i < lines.length; i++) {
      String line = lines[i];
      boolean printLine = true;
      int index = line.indexOf(BLANK_LINE_SUMMARY_PREFIX);
      if (index >= 0) {
        String content = line.substring(0, index);
        String blankLineSummary = line.substring(index);

        if (!content.isEmpty()) {
          if (i != 0) {
            // Ensure each line is separated from the previous by a newline
            // character expect for the first line.  If a newline is printed
            // before the first line, then the text will have an extra blank
            // line at the start of the text.
            builder.append('\n');
          }
          builder.append(blankLineSummary);
          builder.append('\n');
          builder.append(content);
          printLine = false;
        }
      }

      if (printLine) {
        if (i != 0) {
          // Ensure each line is separated from the previous by a newline
          // character expect for the first line.  If a newline is printed
          // before the first line, then the text will have an extra blank
          // line at the start of the text.
          builder.append('\n');
        }
        builder.append(line);
      }
    }
    return builder.toString();
  }

  /**
   * Given input text adds special comments in the text that encode blank line information in the
   * text.
   */
  public static String encodeBlankLineInformation(String text) {
    List<TextBlock> textBlocks = getTextBlocks(text);
    StringBuilder builder = new StringBuilder();
    int blankLineCount = 0;
    String[] lineArr = text.split("\n", -1);
    int searchStartIndex = 0;
    for (int row = 0; row < lineArr.length; row++) {
      String line = lineArr[row];
      int blockIndex = getContainingTextBlock(row, textBlocks, searchStartIndex);
      boolean printBlankLineSummary = false;
      if (blockIndex < 0) {
        // the current line is not part of the text block
        if (isBlank(line)) {
          blankLineCount++;
        } else {
          int prevBlockIndex =
              getContainingTextBlock(row - 1, textBlocks, Math.max(0, searchStartIndex - 1));
          if (prevBlockIndex < 0) {
            // the current line is not blank, not in a comment,
            // and not the first line after a comment,
            // and so a blank line summary should be printed
            // before the line
            printBlankLineSummary = true;
          }
        }
      } else {
        searchStartIndex = blockIndex;
        // the current line is part of a comment
        if (row == textBlocks.get(blockIndex).getStartRow()) {
          // if the current row is the first line of a comment
          // so print the blank line summary before the comment
          printBlankLineSummary = true;
        }
      }

      if (printBlankLineSummary) {
        builder.append(buildBlankLineSummary(blankLineCount));
        builder.append('\n');
        blankLineCount = 0;
      }

      builder.append(line);
      builder.append('\n');
    }

    builder.append(buildBlankLineSummary(blankLineCount));
    // Add a ; after the newline to ensure any previous statement was terminated.
    // This is needed to handle the case
    // <pre>
    // /**
    //  * A comment.
    //  */
    // A.B = function() {}
    //
    // // another comment
    // </pre>
    // Note that the line <pre>A.B = function() {}</pre> doesn't end with a <pre>;</pre>.  Because
    // of this the <pre>/** A comment. */<pre> doesn't get attached to <pre>A.B<pre> as expected by
    // Gents because of the <pre>// another comment</pre>.  The addition of a <pre>;</pre> at the
    // end fixes this problem.
    builder.append("\n;");
    return builder.toString();
  }

  /**
   * Given text with blank line information encoded in it, analyze and remove the blank line
   * comments and ensure the returned text has the correct count and location of blank lines.
   */
  public static String decodeBlankLineInformation(String text) {
    final String[] lines = normalizeBlankLineInfo(text).split("\n", -1);

    // Processing should start after any blank lines at the start of the file as well
    // as after any "blank line summary lines" that specifies how many blank lines should
    // be added to the start of the file.  This is done because the decoding is specifically
    // designed to ensure there are not any blank lines at the start of file.
    int startingIndex = 0;
    while (startingIndex < lines.length
        && (isBlank(lines[startingIndex]) || isBlankLineSummary(lines[startingIndex]))) {
      startingIndex++;
    }

    StringBuilder builder = new StringBuilder();
    for (int i = startingIndex; i < lines.length; i++) {
      String line = lines[i];
      if (isBlank(line)) {
        continue;
      }

      if (isBlankLineSummary(line)) {
        int count = getBlankLineSummaryCount(line);
        for (int j = 0; j < count; j++) {
          builder.append("\n");
        }
      } else {
        if (i != startingIndex) {
          builder.append("\n");
        }
        builder.append(line);
      }
    }
    return builder.toString();
  }

  /**
   * Determines if the given line is the start of a block comment. Note that if the line only
   * contains an inline block comment (for example /* comment * / on the same line) this method
   * returns false.
   */
  private static boolean isStartOfBlockComment(String line) {
    int slashStarIndex = line.lastIndexOf("/*");
    int starSlashIndex = line.lastIndexOf("*/");
    // Check if either /* occurs on the line and */ does not occur on the line OR
    // the line (except for whitespace) is of the form /* ... */ OR
    // /* occurs at the end of the line and */ does too, but it is to the right of /*
    // Note that lastIndexOf() is used to handle cases such as
    //   abc /* comment */ xyz            => returns false
    //   abc /* comment */ xyz /* comment => returns true
    //   /* comment */ => returns true
    return (line.trim().startsWith("/*") && line.trim().endsWith("*/"))
        || (slashStarIndex >= 0 && (starSlashIndex < 0 || starSlashIndex <= slashStarIndex));
  }

  /** Given input JavaScript code, identifies all of the TextBlocks in the code. */
  static List<TextBlock> getTextBlocks(String text) {
    List<TextBlock> result = Lists.newArrayList();
    String[] lineArr = text.split("\n", -1);
    int row = 0;
    while (row < lineArr.length) {
      String line = lineArr[row];
      if (isStartOfBlockComment(line)) {
        int start = row;
        while (row < lineArr.length && !lineArr[row].contains("*/")) {
          row++;
        }
        // end is the index of the line after the line containing the */
        int end = row >= lineArr.length ? row : row + 1;

        result.add(new TextBlock(start, end));
        row = end;
      } else {
        row++;
      }
    }
    return result;
  }

  /**
   * Used to determine if the given line of text (row is a 0-based index of a line of text) is
   * within one of the TextBlocks given.
   *
   * @return The index of the TextBlock containing the given line of text or <code>-1</code> if the
   *     line is not in any of the provided TextBlocks.
   */
  private static int getContainingTextBlock(int row, List<TextBlock> textBlocks, int startIndex) {
    for (int i = startIndex; i < textBlocks.size(); i++) {
      TextBlock block = textBlocks.get(i);
      if (row >= block.getStartRow() && row < block.getEndRow()) {
        return i;
      }
    }
    return -1;
  }

  /**
   * A text block is a sequence of lines of text that viewed as a single unit. That is, a comment
   * containing blank line information should not be placed anywhere inside the lines of text in a
   * TextBlock.
   *
   * <p>For example, in the code:
   *
   * <pre>
   *   0  const x = 0;
   *   1
   *   2 /**
   *   3 * Some
   *   4 * block
   *   5 * comment
   *   6 * /
   *   7 const y =0;
   * </pre>
   *
   * Newline comments should not be added within the block comment. That is, blank line encoding
   * comments should be added as:
   *
   * <pre>
   *   0 // GENTS_BLANK_LINE_COUNT: 0
   *   1 const x = 0;
   *   2
   *   3 // GENTS_BLANK_LINE_COUNT: 1
   *   4 /**
   *   5 * Some
   *   6 * block
   *   7 * comment
   *   8 * /
   *   9 const y =0;
   * </pre>
   *
   * and should NOT be added with within the block comment as in:
   *
   * <pre>
   *   0  // GENTS_BLANK_LINE_COUNT: 0
   *   1  const x = 0;
   *   2
   *   3  // GENTS_BLANK_LINE_COUNT: 1
   *   4  /**
   *   5  // GENTS_BLANK_LINE_COUNT: 0
   *   6  * Some
   *   7  // GENTS_BLANK_LINE_COUNT: 0
   *   8  * block
   *   9  // GENTS_BLANK_LINE_COUNT: 0
   *   10 * comment
   *   11 // GENTS_BLANK_LINE_COUNT: 0
   *   12 * /
   *   13 // GENTS_BLANK_LINE_COUNT: 0
   *   14 const y =0;
   * </pre>
   *
   * Thus, in the code above, lines 2 (inclusive) to 7 (exclusive) for the comment block form a
   * TextBlock.
   */
  static class TextBlock {
    // inclusive
    private final int startRow;
    // exclusive
    private final int endRow;

    TextBlock(int startRow, int endRow) {
      this.startRow = startRow;
      this.endRow = endRow;
    }

    public int getStartRow() {
      return startRow;
    }

    public int getEndRow() {
      return endRow;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (!(o instanceof TextBlock)) {
        return false;
      }
      TextBlock that = (TextBlock) o;
      return startRow == that.startRow && endRow == that.endRow;
    }

    @Override
    public int hashCode() {
      return Objects.hash(startRow, endRow);
    }

    @Override
    public String toString() {
      return "TextBlock{" + "startRow=" + startRow + ", endRow=" + endRow + '}';
    }
  }
}
