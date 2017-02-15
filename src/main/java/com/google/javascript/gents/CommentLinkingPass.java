package com.google.javascript.gents;

import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.Callback;
import com.google.javascript.jscomp.parsing.parser.trees.Comment;
import com.google.javascript.jscomp.parsing.parser.trees.Comment.Type;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Links comments directly to the AST to preserve locations in file */
public final class CommentLinkingPass implements CompilerPass {
  /** Regex matcher for all 3 empty comment types */
  private static final Pattern EMPTY_COMMENT_REGEX =
      Pattern.compile("^\\s*(\\/\\/|\\/\\*(\\s|\\*)*\\*\\/)\\s*$");

  /** Regex fragment that optionally matches the beginning of a JSDOC line. */
  private static final String BEGIN_JSDOC_LINE = "(?<block>[ \t]*\\*[ \t]*)?";

  /** Regex fragment to optionally match end-of-line */
  private static final String EOL = "([ \t]*\n)?";

  /**
   * These jsdocs delete everything except for the `keep` capture group Some regexes contain an
   * empty capture group for uniform handling.
   */
  private static final Pattern[] JSDOC_REPLACEMENTS = {
    Pattern.compile(
        BEGIN_JSDOC_LINE + "@(extends|implements|type)[ \t]*(\\{.*\\})[ \t]*(?<keep>)" + EOL),
    Pattern.compile(BEGIN_JSDOC_LINE + "@(constructor|interface|record)[ \t]*(?<keep>)" + EOL),
    Pattern.compile(
        BEGIN_JSDOC_LINE
            + "@(private|protected|public|package|const)[ \t]*(\\{.*\\})?[ \t]*(?<keep>)"
            + EOL),
    // Removes @param and @return if there is no description
    Pattern.compile(
        BEGIN_JSDOC_LINE + "@param[ \t]*(\\{.*\\})[ \t]*[\\w\\$]+[ \t]*(?<keep>\\*\\/|\n)"),
    Pattern.compile(BEGIN_JSDOC_LINE + "@returns?[ \t]*(\\{.*\\})[ \t]*(?<keep>\\*\\/|\n)"),
    Pattern.compile(BEGIN_JSDOC_LINE + "(?<keep>@(param|returns?))[ \t]*(\\{.*\\})"),
    // Remove type annotation from @export
    Pattern.compile(BEGIN_JSDOC_LINE + "(?<keep>@export)[ \t]*(\\{.*\\})")
  };

  private static final Pattern[] COMMENT_REPLACEMENTS = {
    Pattern.compile("//\\s*goog.scope\\s*(?<keep>)")
  };

  private final Compiler compiler;
  private final NodeComments nodeComments;

  public CommentLinkingPass(Compiler compiler) {
    this.compiler = compiler;
    this.nodeComments = new NodeComments();
  }

  public NodeComments getComments() {
    return nodeComments;
  }

  @Override
  public void process(Node externs, Node root) {
    for (Node script : root.children()) {
      if (script.isScript()) {
        // Note: this doesn't actually copy the list since the underlying list is already an
        // immutable list.
        ImmutableList<Comment> comments =
            ImmutableList.copyOf(compiler.getComments(script.getSourceFileName()));
        NodeTraversal.traverseEs6(compiler, script, new LinkCommentsForOneFile(comments));
      }
    }
  }

  /**
   * Links all the comments in one file to the AST.
   *
   * <p>Comments are grouped based on location in the source file. Adjacent comments are grouped
   * together in order to assure that the we do not break up the same coherent thought. Comment
   * groups are separated based on empty lines or lines of code.
   */
  private class LinkCommentsForOneFile implements Callback {
    /** List of all comments in the file */
    private final ImmutableList<Comment> comments;
    /** Collects of all comments that are grouped together. */
    private List<Comment> commentBuffer = new ArrayList<>();

    private int lastCommentIndex = 0;

    private LinkCommentsForOneFile(ImmutableList<Comment> comments) {
      this.comments = comments;
      if (!comments.isEmpty()) {
        commentBuffer.add(comments.get(0));
      }
    }

    /** Returns if we have finished linking all comments in the current file. */
    private boolean isDone() {
      return lastCommentIndex >= comments.size();
    }

    /** Returns if there are comments in the input that we have not looked at yet. */
    private boolean hasRemainingComments() {
      return lastCommentIndex < comments.size() - 1;
    }

    private Comment getCurrentComment() {
      return comments.get(lastCommentIndex);
    }

    private Comment getNextComment() {
      return comments.get(lastCommentIndex + 1);
    }

    /** Returns the ending line number of the current comment. */
    private int getLastLineOfCurrentComment() {
      return getCurrentComment().location.end.line + 1;
    }

    /** Returns the starting line number of the next comment. */
    private int getFirstLineOfNextComment() {
      return getNextComment().location.start.line + 1;
    }

    /** Shifts a new comment into the buffer. */
    private void addNextCommentToBuffer() {
      if (hasRemainingComments()) {
        commentBuffer.add(getNextComment());
      }
      lastCommentIndex++;
    }

    /** Flushes the comment buffer, linking it to the provided node. */
    private void linkCommentBufferToNode(Node n) {
      StringBuilder sb = new StringBuilder();
      String sep = "\n";
      for (Comment c : commentBuffer) {
        String comment = filterCommentContent(c.type, c.value);
        if (!comment.isEmpty()) {
          sb.append(sep).append(comment);
        }
      }

      String comment = sb.toString();
      if (!comment.isEmpty()) {
        nodeComments.putComment(n, comment);
      }
      commentBuffer.clear();
    }

    /** Removes unneeded tags and markers from the comment. */
    private String filterCommentContent(Type type, String comment) {
      Pattern[] replacements = (type == Type.JSDOC) ? JSDOC_REPLACEMENTS : COMMENT_REPLACEMENTS;
      for (Pattern p : replacements) {
        Matcher m = p.matcher(comment);
        if (m.find() && m.group("keep") != null && m.group("keep").trim().length() > 0) {
          // keep documentation, if any
          comment = m.replaceAll("${block}${keep}");
        } else {
          // nothing to keep, remove the line
          comment = m.replaceAll("");
        }
      }
      return isWhitespaceOnly(comment) ? "" : comment;
    }

    /** Returns if the comment only contains whitespace. */
    private boolean isWhitespaceOnly(String comment) {
      return EMPTY_COMMENT_REGEX.matcher(comment).find();
    }

    /** Returns a new comment attached to an empty node. */
    private Node newFloatingCommentFromBuffer() {
      Node c = new Node(Token.EMPTY);
      linkCommentBufferToNode(c);
      return c;
    }

    /** Returns if the current comment is directly adjacent to a line. */
    private boolean isCommentAdjacentToLine(int line) {
      int commentLine = getLastLineOfCurrentComment();
      return commentLine == line
          || (commentLine == line - 1 && commentLine != getFirstLineOfNextComment());
    }

    @Override
    public final boolean shouldTraverse(NodeTraversal nodeTraversal, Node n, Node parent) {
      if (isDone()) {
        return false;
      }
      // Ignore top level block
      if (n.isScript() || n.isModuleBody()) {
        return true;
      }

      int line = n.getLineno();
      // Comment is AFTER this line
      if (getLastLineOfCurrentComment() > line) {
        return true;
      }

      while (hasRemainingComments() && !isCommentAdjacentToLine(line)) {
        // Comment is AFTER this line
        if (getLastLineOfCurrentComment() > line) {
          return true;
        }

        // If the new comment is separated from the current one by at least a line,
        // output the current group of comments.
        if (getFirstLineOfNextComment() - getLastLineOfCurrentComment() > 1) {
          parent.addChildBefore(newFloatingCommentFromBuffer(), n);
        }
        addNextCommentToBuffer();
      }

      if (getLastLineOfCurrentComment() == line) {
        // Comment on same line as code
        linkCommentBufferToNode(n);
      } else if (getLastLineOfCurrentComment() == line - 1) {
        // Comment ends just before code
        linkCommentBufferToNode(n);
      } else if (!hasRemainingComments()) {
        // Exhausted all comments, output floating comment before current node
        parent.addChildBefore(newFloatingCommentFromBuffer(), n);
      }

      addNextCommentToBuffer();
      return true;
    }

    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (isDone()) {
        return;
      }
      if (n.isScript()) {
        // New dummy node at the end of the file
        Node dummy = new Node(Token.EMPTY);
        n.addChildToBack(dummy);

        while (hasRemainingComments()) {
          // If the new comment is separated from the current one by at least a line,
          // output the current group of comments.
          if (getFirstLineOfNextComment() - getLastLineOfCurrentComment() > 1) {
            dummy.getParent().addChildBefore(newFloatingCommentFromBuffer(), dummy);
          }
          addNextCommentToBuffer();
        }
        n.addChildBefore(newFloatingCommentFromBuffer(), dummy);
        addNextCommentToBuffer();
        n.removeChild(dummy);
      }
    }
  }
}
