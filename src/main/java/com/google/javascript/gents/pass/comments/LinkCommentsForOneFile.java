package com.google.javascript.gents.pass.comments;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.parsing.parser.trees.Comment;
import com.google.javascript.rhino.InputId;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.ArrayList;
import java.util.List;

/**
 * Links all the comments in one file to the AST.
 *
 * <p>Comments are grouped based on location in the source file. Adjacent comments are grouped
 * together in order to assure that the we do not break up the same coherent thought. Comment groups
 * are separated based on empty lines or lines of code.
 */
public class LinkCommentsForOneFile implements NodeTraversal.Callback {

  /**
   * These nodes can expand their children with new EMPTY nodes. We will use that as a placeholder
   * for floating comments.
   */
  private static final ImmutableSet<Token> TOKENS_CAN_HAVE_EMPTY_CHILD =
      ImmutableSet.of(Token.SCRIPT, Token.MODULE_BODY, Token.BLOCK);
  /**
   * Comments assigned to these nodes will not be emitted during code generation because these nodes
   * don't use add(Node n, Context ctx). Therefore we avoid assigning comments to them.
   */
  // TODO(bowenni): More nodes missing here?
  private static final ImmutableSet<Token> TOKENS_IGNORE_COMMENTS =
      ImmutableSet.of(Token.LABEL_NAME, Token.GENERIC_TYPE, Token.BLOCK);

  /** List of all comments in the file */
  private final ImmutableList<Comment> comments;
  /** Collects of all comments that are grouped together. */
  private List<Comment> commentBuffer = new ArrayList<>();

  private int lastCommentIndex = 0;

  private Compiler compiler;
  private NodeComments nodeComments;

  public LinkCommentsForOneFile(
      Compiler compiler, ImmutableList<Comment> comments, NodeComments nodeComments) {
    this.compiler = compiler;
    this.nodeComments = nodeComments;
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
    if (!canHaveComment(n)) {
      linkCommentBufferToNode(n.getParent());
      return;
    }
    StringBuilder sb = new StringBuilder();
    String sep = "\n";
    for (Comment c : commentBuffer) {
      String comment = CommentUtil.filterCommentContent(c.value, c.type == Comment.Type.JSDOC);
      if (!comment.isEmpty()) {
        sb.append(sep).append(comment);
      }
    }

    String comment = sb.toString();
    if (!comment.isEmpty()) {
      nodeComments.addComment(n, comment);
    }
    commentBuffer.clear();
  }

  /** Returns a new comment attached to an empty node. */
  private Node newFloatingCommentFromBuffer() {
    Node c = new Node(Token.EMPTY);
    linkCommentBufferToNode(c);
    return c;
  }

  /**
   * If the parent node can survive code generation with an extra EMPTY node child, then output
   * floating comments by attaching to a new EMPTY node before the current node. Otherwise try to
   * put the comment in current node. If the current node doesn't accept comments (for example a
   * BLOCK node will ignore any comments mapped to it), then attach the comments to the parent node.
   * The parent node might not be the best place to hold the comment but at least we don't lose the
   * comment and we don't break code generation.
   */
  private void outputFloatingCommentFromBuffer(Node n) {
    Node parent = n.getParent();
    if (parent == null) {
      linkCommentBufferToNode(n);
    } else if (TOKENS_CAN_HAVE_EMPTY_CHILD.contains(parent.getToken())) {
      parent.addChildBefore(newFloatingCommentFromBuffer(), n);
    } else if (canHaveComment(n)) {
      linkCommentBufferToNode(n);
    } else {
      outputFloatingCommentFromBuffer(parent);
    }
  }

  private boolean canHaveComment(Node n) {
    if (TOKENS_IGNORE_COMMENTS.contains(n.getToken())) {
      return false;
    }

    // Special case: GETPROP node's second child(the property name) loses comments.
    Node parent = n.getParent();
    if (parent != null && parent.isGetProp() && parent.getSecondChild() == n) {
      return false;
    }

    return true;
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

    boolean outputCommentAfterLine = false;
    while (hasRemainingComments() && !isCommentAdjacentToLine(line)) {
      // Comment is AFTER this line
      if (getLastLineOfCurrentComment() > line) {
        return true;
      }

      // If the new comment is separated from the current one by at least a line,
      // output the current group of comments.
      if (getFirstLineOfNextComment() - getLastLineOfCurrentComment() > 1) {
        outputFloatingCommentFromBuffer(n);
      }
      addNextCommentToBuffer();
      outputCommentAfterLine = true;
    }

    if (getLastLineOfCurrentComment() == line) {
      // Comment on same line as code -- we have to make sure this is the node we should attach
      // it to.
      if (parent.isCall()) {
        // We're inside a function call, we have to be careful about which node to attach to,
        // since comments
        // can go before or after an argument.
        if (linkFunctionArgs(n, line)) return true;
      } else if (getCurrentComment().location.end.column < n.getCharno()) {
        // comment is before this node, so attach it
        linkCommentBufferToNode(n);
      } else {
        return true;
      }
    } else if (getLastLineOfCurrentComment() == line - 1) {
      // Comment ends just before code
      linkCommentBufferToNode(n);
    } else if (!hasRemainingComments() && !outputCommentAfterLine) {
      // Exhausted all comments, output floating comment.
      outputFloatingCommentFromBuffer(n);
    }

    if (!outputCommentAfterLine) {
      addNextCommentToBuffer();
    }
    return true;
  }

  private boolean linkFunctionArgs(Node n, int line) {
    if (n.getNext() == null) {
      // the last argument in the call, attach the comment here
      linkCommentBufferToNode(n);
    } else {
      int endOfComment = getCurrentComment().location.end.column;
      int startOfNextNode = n.getNext().getCharno();
      if (endOfComment < startOfNextNode) {
        // the comment is between this node and the next node, so check which side of the comment
        // the comma
        // separating the arguments is on to decide which argument to attach it to.
        String lineContents =
            compiler.getInput(new InputId(n.getSourceFileName())).getSourceFile().getLine(line);
        // nextNode could be on a different line.
        int searchForCommaUntil =
            getCurrentComment().location.end.line == n.getNext().getLineno()
                ? startOfNextNode
                : lineContents.length();
        String interval = lineContents.substring(endOfComment, searchForCommaUntil);
        if (interval.contains(",")) {
          linkCommentBufferToNode(n);
        } else {
          linkCommentBufferToNode(n.getNext());
        }
      } else {
        // comment is after this node, keep traversing the node graph
        return true;
      }
    }
    return false;
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
