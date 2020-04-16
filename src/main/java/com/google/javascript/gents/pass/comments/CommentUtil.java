package com.google.javascript.gents.pass.comments;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommentUtil {

  /** Regex matcher for all 3 empty comment types */
  private static final Pattern EMPTY_COMMENT_REGEX =
      Pattern.compile("^\\s*(\\/\\/|\\/\\*(\\s|\\*)*\\*\\/)\\s*$");

  /** Regex fragment that optionally matches the beginning of a JSDOC line. */
  private static final String BEGIN_JSDOC_LINE = "(?<block>[ \t]*\\*[ \t]*)?";

  /** Regex fragment to optionally match end-of-line */
  private static final String EOL = "(?<eol>[ \t]*\n)?";

  /**
   * These RegExes delete everything except for the `block` (see BEGIN_JSDOC_LINE) and `keep`
   * capture groups. These RegExes must contain a `keep` group.
   *
   * <p>TODO(b/151088265) Simplify regex.
   */
  private static final Pattern[] JSDOC_REPLACEMENTS_WITH_KEEP = {
    // Removes @param and @return if there is no description
    Pattern.compile(
        BEGIN_JSDOC_LINE + "@param[ \t]*(\\{[^@]*\\})[ \t]*[\\w\\$]+[ \t]*(?<keep>\\*\\/|\n)"),
    Pattern.compile(BEGIN_JSDOC_LINE + "@returns?[ \t]*(\\{.*\\})[ \t]*(?<keep>\\*\\/|\n)"),
    Pattern.compile(BEGIN_JSDOC_LINE + "(?<keep>@(param|returns?))[ \t]*(\\{.*\\})"),
    // Remove type annotation from @export
    Pattern.compile(BEGIN_JSDOC_LINE + "(?<keep>@export)[ \t]*(\\{.*\\})"),
  };

  /**
   * These RegExes delete everything that's matched by them, they must begin with BEGIN_JSDOC_LINE
   * and finish with EOL.
   */
  private static final Pattern[] JSDOC_REPLACEMENTS_NO_KEEP = {
    Pattern.compile(BEGIN_JSDOC_LINE + "@(extends|implements|type)[ \t]*(\\{[^@]*\\})[ \t]*" + EOL),
    Pattern.compile(BEGIN_JSDOC_LINE + "@(constructor|interface|record)[ \t]*" + EOL),
    Pattern.compile(
        BEGIN_JSDOC_LINE
            + "@(private|protected|public|package|const|enum)[ \t]*(\\{.*\\})?[ \t]*"
            + EOL),
    Pattern.compile(BEGIN_JSDOC_LINE + "@suppress[ \t]*\\{extraRequire\\}[ \t]*" + EOL),
    // Remove @typedef if there is no description.
    Pattern.compile(BEGIN_JSDOC_LINE + "@typedef[ \t]*(\\{.*\\})" + EOL, Pattern.DOTALL),
    // Remove @abstract.
    Pattern.compile(BEGIN_JSDOC_LINE + "@abstract" + EOL, Pattern.DOTALL)
  };

  private static final Pattern[] COMMENT_REPLACEMENTS = {Pattern.compile("//\\s*goog.scope\\s*")};

  private CommentUtil() {}

  /** Removes unneeded tags and markers from the comment. */
  public static String filterCommentContent(String comment, boolean isJsDoc) {
    if (isJsDoc) {
      comment = preprocessJsDocComment(comment);
      for (Pattern p : JSDOC_REPLACEMENTS_WITH_KEEP) {
        Matcher m = p.matcher(comment);
        if (m.find() && m.group("keep") != null && m.group("keep").trim().length() > 0) {
          // keep documentation, if any
          comment = m.replaceAll("${block}${keep}");
        } else {
          // nothing to keep, remove the line
          comment = m.replaceAll("");
        }
      }

      for (Pattern p : JSDOC_REPLACEMENTS_NO_KEEP) {
        Matcher m = p.matcher(comment);
        if (m.find()) {
          if (m.group("eol") != null && m.group("eol").trim().length() == 0) {
            // if the end of the line was matched, then there's nothing to keep, remove the line
            comment = m.replaceAll("");
          } else {
            // If something is still left on the line after the match was removed, keep
            // `block` around since it matches the comment * for the beginning of the line.
            comment = p.matcher(comment).replaceAll("${block}");
          }
        }
      }
    } else {
      for (Pattern p : COMMENT_REPLACEMENTS) {
        comment = p.matcher(comment).replaceAll("");
      }
    }

    // Removes @template annotations
    comment = comment.replaceAll("\\s+\\*\\s+@template(\\s(?!\n)+\\S+)+", "");

    return isWhitespaceOnly(comment) ? "" : comment;
  }

  /**
   * Per b/145684409, Gents used to throw away JSDoc annotations whose explanatory text was on lines
   * following JSDoc annotation, making it unclear what the explanitory text refers to. It did this
   * because the `filterCommentContent()` function above assumes JSDoc comments and their
   * explanatory text will always be on the same line.
   *
   * <p>Rather than try to improve the implementation of `filterCommentContent()`, the following
   * function, `preprocessJsDocComments()` was added. It takes a JSDoc Comment and returns it with
   * all explanatory text on the same line. (Note: Auto-formatter will run afterwards, cleaning up
   * line over-runs.)
   *
   * <p>Requires `comment` to be of `Type.JSDOC`.
   */
  private static String preprocessJsDocComment(String comment) {
    // b/145684409 only occurs when `comment` spans multiple lines. So, if `comment` isn't
    // multiline, don't modify it.
    if (comment.contains("\n")) {

      // The following regex matches `} \n * Explanation` as follows:
      //
      //   \\}
      //     exactly one right curly bracket.
      //
      //   \\s*
      //     zero or more whitespaces (including tab, newline, etc.).
      //
      //   \\*
      //     exactly one asterisks.
      //
      //   \\s{2,}(?![@,/,\n])
      //     two or more whitespaces (including tab, newline, etc.), except whitespaces
      //     followed by an ampersand, forward slash, or newline.
      //
      //     Negative lookahead disallows the following matches:
      //       `} \n * @`    Type information followed by another JSDoc annotation
      //       `} \n */`     Type information followed by a trailing `*/`
      //       `} \n * \n `  Type information followed by an empty multiline comment row
      //
      //   (?<explanatoryText>\\S+)
      //     one or more non whitespace characters; store matched characters in
      //     `explanatoryText` variable.
      //
      // Replaces match with `} {blah} Explanation`.
      //
      // In other words, `@foo {blah} \n * Explanation` becomes `@foo {blah} Explanation`.
      comment =
          comment.replaceAll(
              "\\}\\s*\\*\\s{2,}(?![@,/,\n])(?<explanatoryText>\\S+)", "} ${explanatoryText}");

      // The following regex matches `} identifier \n * Explanation` as follows:
      //
      //   \\}
      //     exactly one right curly bracket.
      //
      //   \\s+
      //     one or more whitespaces (including tab, newline, etc.).
      //
      //   (?<identifier>\\S+)
      //     one or more non whitespace characters; store matched characters in `identifier`
      //     variable.
      //
      //   \\s*
      //     zero or more whitespaces (including tab, newline, etc.).
      //
      //   \\*
      //     exactly one asterisks.
      //
      //   [^\\S\\n\\r@/]{2,}
      //     Two or more whitespace characters other than newline or line feed. Can't be ampersand
      //     or forward slash, either.
      //
      //     Note: [^\\S] is a double negative equivalent to \\s. The double negative expression
      //           [^\\S\\n\\r] can be read, "The set of \\s minus \\n and \\r".
      //
      //     [^\\S\\n\\r@/]{2,} disallows the following matches:
      //       `} identifier \n * \n `  An identifier followed by an empty multiline comment row
      //       `} identifier \n * @`    An identifier followed by another JSDoc annotation
      //       `} identifier \n */`     An identifier followed by a trailing `*/`
      //
      // Replaces match with `} {blah} identifier Explanation`.
      //
      // In other words, `@foo {blah} identifier \n * Explanation` becomes
      // `@foo {blah} identifier Explanation`.
      comment =
          comment.replaceAll(
              "\\}\\s+(?<identifier>\\S+)\\s*\\*[^\\S\\n\\r@/]{2,}", "} ${identifier} ");
    }
    return comment;
  }

  /** Returns if the comment only contains whitespace. */
  private static boolean isWhitespaceOnly(String comment) {
    return EMPTY_COMMENT_REGEX.matcher(comment).find();
  }
}
