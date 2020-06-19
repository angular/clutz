package com.google.javascript.gents.pass.comments;

import com.google.javascript.jscomp.parsing.parser.trees.Comment;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.NonJSDocComment;
import java.util.Objects;

/**
 * The JSCompiler API has three types of comments classes, a <code>JSDocInfo</code>, a <code>
 * NonJSDocComment</code>, and a <code>Comment</code>. When processing comments, Gents does not need
 * to differentiate between these different types. Instead, it only needs to know the text of a
 * comment and its offset in the original text. The offset is needed to distinguish two comments
 * with the same text but in different locations in the input text as distinct comments.
 *
 * <p>This class provides this abstraction. What this allows is to accurately compare comments
 * collected by the CommentLinkingPass and the AstCommentLinkingPass even though, behind the scenes,
 * the CommentLinkingPass processes JSCompiler Comments and the AstCommentLinkingPass processes
 * JSDocInfos and NonJSDocComments. Despite this, both provide a NodeComments object describing
 * their processed comments, and that object contains a mapping of <code>GeneralComments</code>.
 */
public class GeneralComment {
  private final String text;
  private final int offset;

  private GeneralComment(String text, int offset) {
    this.text = text;
    this.offset = offset;
  }

  public static GeneralComment from(Comment comment) {
    return new GeneralComment(comment.value, comment.getAbsolutePosition());
  }

  public static GeneralComment from(JSDocInfo info) {
    return new GeneralComment(info.getOriginalCommentString(), info.getOriginalCommentPosition());
  }

  public static GeneralComment from(NonJSDocComment comment) {
    return new GeneralComment(comment.getCommentString(), comment.getStartPosition().getOffset());
  }

  public static GeneralComment from(String text, int offset) {
    return new GeneralComment(text, offset);
  }

  public static GeneralComment from(String text) {
    return new GeneralComment(text, -1);
  }

  public String getText() {
    return text;
  }

  public int getOffset() {
    return offset;
  }

  public boolean isInlineJsDoc() {
    return text.trim().startsWith("/**") && !text.contains("\n");
  }

  @Override
  public String toString() {
    return "GeneralComment{" + "text='" + text + '\'' + ", offset=" + offset + '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof GeneralComment)) {
      return false;
    }
    GeneralComment that = (GeneralComment) o;
    return offset == that.offset && text.trim().equals(that.text.trim());
  }

  @Override
  public int hashCode() {
    return Objects.hash(text.trim(), offset);
  }
}
