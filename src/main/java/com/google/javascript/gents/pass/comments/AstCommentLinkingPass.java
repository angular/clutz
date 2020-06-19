package com.google.javascript.gents.pass.comments;

import com.google.common.collect.Lists;
import com.google.javascript.gents.SourceExtractor;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.NonJSDocComment;
import java.io.IOException;
import java.util.Comparator;
import java.util.List;

/**
 * This compiler pass uses comment information stored in the AST (which is available if the
 * `setParseJsDocDocumentation(JsDocParsing.INCLUDE_ALL_COMMENTS)` flag is set) and associates that
 * comment information to Nodes in the AST.
 *
 * <p>It further breaks down comments into individual pieces where it can. That is, the JSCompiler
 * `getNonJSDocComment()` method may return ``` // some comment
 *
 * <p>// another comment
 *
 * <p>// a third comment ``` for a node. This compiler pass takes that information and instead
 * associates with that node three individual comments `// some comment`, `// another comment`, and
 * `// a third comment`.
 *
 * <p>This is needed because the <code>CommentLinkingPass</code> also associates comments to Nodes
 * but uses the older `Compiler.getComments()` method, and was the legacy way for Gents to associate
 * comments with Nodes.
 *
 * <p>By having this pass break comments into individual pieces, it is possible to compare the
 * precise comments found by this compiler pass with the ones found by the CommentLinkingPass.
 *
 * <p>Also note that this association is done is its own separate pass so that comment information
 * can be extracted from the AST prior to running any other Gents compiler passes, which may alter
 * the AST.
 */
public class AstCommentLinkingPass implements CompilerPass {
  private final Compiler compiler;
  private final NodeComments nodeComments;
  private final SourceExtractor extractor;

  public AstCommentLinkingPass(Compiler compiler, SourceExtractor extractor) {
    this.compiler = compiler;
    this.nodeComments = new NodeComments();
    this.extractor = extractor;
  }

  public NodeComments getComments() {
    return nodeComments;
  }

  /**
   * Takes a string that represents a comment or a sequence of comments concatenated together with
   * one or more newlines and returns a list of GeneralComments, one for each comment in the input
   * text. The 'startOffset' is the offset of 'text' in the original input JavaScript source and is
   * used to get accurate offsets for each of the GeneralComments constructed.
   */
  static List<GeneralComment> splitAndFilterCommentText(String text, int startOffset) {
    List<GeneralComment> result = Lists.newArrayList();
    char[] chars = text.toCharArray();
    int i = 0;
    while (i < chars.length) {
      char c = chars[i++];
      if (c == '/') {
        StringBuilder builder = new StringBuilder();
        builder.append(c);
        final int start = startOffset + i - 1;
        if (i >= chars.length || (chars[i] != '/' && chars[i] != '*')) {
          throw new IllegalStateException(
              "Expected a / to be followed by / or * but found "
                  + ((i < chars.length) ? chars[i] : "the end of the text")
                  + " for '"
                  + text
                  + "' at offset "
                  + i);
        }
        char next = chars[i++];
        builder.append(next);
        if (next == '/') {
          while (i < chars.length && chars[i] != '\n') {
            builder.append(chars[i++]);
          }
          while (i < chars.length && chars[i] == '\n') {
            i++;
          }
        } else if (next == '*') {
          while (i + 1 < chars.length && !(chars[i] == '*' && chars[i + 1] == '/')) {
            builder.append(chars[i++]);
          }
          if (i + 1 < chars.length && chars[i] == '*' && chars[i + 1] == '/') {
            // also append the */
            builder.append(chars[i++]);
            builder.append(chars[i++]);
          }
        } else {
          throw new RuntimeException("Unreachable code");
        }
        String rawCommentText = builder.toString();
        boolean isJsDoc = rawCommentText.startsWith("/**");
        String trimmedCommentText = CommentUtil.filterCommentContent(rawCommentText, isJsDoc);
        if (!trimmedCommentText.isEmpty()) {
          result.add(GeneralComment.from(trimmedCommentText, start));
        }
      }
    }
    return result;
  }

  /**
   * Used to determine if the specified comment with the specified offset in the input source
   * for the specified node matches the actual literal text of the comment in the input source.
   *
   * This is used to address bug b/154348732.
   */
  private boolean doesCommentAlignWithInput(Node node, String comment, int offset) {
    if (node == null || comment == null) {
      return false;
    }

    try {
      String fileSource = extractor.getFullFileSource(node);
      if (fileSource == null) {
        return false;
      }
      String realComment = fileSource.substring(offset, offset + comment.length());
      return comment.equals(realComment);
    } catch (IOException e) {
      // the IOException is converted to a RuntimeException since this method is used in the
      // NodeTraversal.Callback#visit method that cannot throw an IOException and so this
      // method throws an exception that does not need to be caught or re-thrown
      throw new RuntimeException(e);
    }
  }

  @Override
  public void process(Node externs, Node root) {
    for (Node script : root.children()) {
      NodeTraversal.traverse(
          compiler,
          script,
          new NodeTraversal.Callback() {
            @Override
            public boolean shouldTraverse(NodeTraversal nodeTraversal, Node n, Node parent) {
              return true;
            }

            @Override
            public void visit(NodeTraversal t, Node n, Node parent) {
              NonJSDocComment nonJSDocInfo = n.getNonJSDocComment();
              JSDocInfo jsDocInfo = n.getJSDocInfo();

              List<GeneralComment> comments = Lists.newArrayList();
              // address b/154348732 by only using a comment reported by JSCompiler if it
              // matches the literal text in the input source file
              if (nonJSDocInfo != null
                  && doesCommentAlignWithInput(
                      n,
                      nonJSDocInfo.getCommentString(),
                      nonJSDocInfo.getStartPosition().getOffset())) {
                comments.addAll(
                    splitAndFilterCommentText(
                        nonJSDocInfo.getCommentString(),
                        nonJSDocInfo.getStartPosition().getOffset()));
              }

              // address b/154348732 by only using a comment reported by JSCompiler if it
              // matches the literal text in the input source file
              if (jsDocInfo != null
                  && !jsDocInfo.isInlineType()
                  && doesCommentAlignWithInput(
                      n,
                      jsDocInfo.getOriginalCommentString(),
                      jsDocInfo.getOriginalCommentPosition())) {
                comments.addAll(
                    splitAndFilterCommentText(
                        jsDocInfo.getOriginalCommentString(),
                        jsDocInfo.getOriginalCommentPosition()));
              }

              comments.sort(Comparator.comparing(GeneralComment::getOffset));

              if (!comments.isEmpty()) {
                nodeComments.setComments(n, comments);
              }
            }
          });
    }
  }
}
