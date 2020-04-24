package com.google.javascript.gents;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.javascript.gents.experimental.ExperimentTracker;
import com.google.javascript.gents.experimental.ExperimentTracker.Experiment;
import com.google.javascript.gents.pass.comments.GeneralComment;
import com.google.javascript.gents.pass.comments.NodeComments;
import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.Nullable;

/** Code generator for gents to add TypeScript specific code generation. */
public class GentsCodeGenerator extends CodeGenerator {

  private final NodeComments astComments;
  private final NodeComments nodeComments;
  private final Map<String, String> externsMap;
  private final SourceExtractor extractor;
  private final Set<GeneralComment> commentsAlreadyUsed;
  private final ExperimentTracker experimentTracker;

  public GentsCodeGenerator(
      CodeConsumer consumer,
      CompilerOptions options,
      NodeComments astComments,
      NodeComments nodeComments,
      Map<String, String> externsMap,
      SourceExtractor extractor,
      ExperimentTracker experimentTracker) {
    super(consumer, options);
    this.astComments = astComments;
    this.nodeComments = nodeComments;
    this.experimentTracker = experimentTracker;
    this.externsMap = externsMap;
    this.extractor = extractor;
    /*
     * The 'astComments' are comments associated with Nodes by the AstCommentLinkingPass that
     * were associated with Nodes directly by JSCompiler.  The 'nodeComments' are comments
     * associated with Nodes manually by the CommentLinkingPass, and handles some comments
     * missed by JSCompiler, but also has comments that are also in 'astComments'.
     *
     * The set below is used to record which comments have already been emitted to ensure
     * a comment is not double emitted (which would occur when both the AstCommentLinkingPass
     * and the CommentLinkingPass know about the comment).
     */
    this.commentsAlreadyUsed = Sets.newHashSet();
  }

  /**
   * Add new comments to the output for a particular node. Priority is given to the comments in
   * <code>astComments</code>, work is done to ensure comment duplication doesn't occur, and the
   * comments are added in order by their offset.
   *
   * @param astComments The comments determined by the AstCommentLinkingPass a particular node
   * @param linkedComments The comments determined by the CommentLinkingPass for the same node as
   *     <code>astComments</code>.
   */
  private void addNewComments(
      List<GeneralComment> astComments, List<GeneralComment> linkedComments) {
    if (astComments == null && linkedComments == null) {
      return;
    }

    List<GeneralComment> comments = Lists.newArrayList();
    if (astComments != null) {
      for (GeneralComment c : astComments) {
        if (commentsAlreadyUsed.contains(c)) {
          continue;
        }
        commentsAlreadyUsed.add(c);
        comments.add(c);
      }
    }

    if (linkedComments != null) {
      for (GeneralComment c : linkedComments) {
        if (commentsAlreadyUsed.contains(c)) {
          continue;
        }
        commentsAlreadyUsed.add(c);
        comments.add(c);
      }
    }

    comments.sort(Comparator.comparingInt(GeneralComment::getOffset));

    for (GeneralComment c : comments) {
      // CodeGernator.add("\n") doesn't append anything. Fixing the actual bug in Closure Compiler
      // is difficult. Works around the bug by passing " \n". The extra whitespace is stripped by
      // Closure and not emitted in the final output of Gents. An exception is when this is the
      // first line of file Closure doesn't strip the whitespace. TypeScriptGenerator has the
      // handling logic that removes leading empty lines, including "\n" and " \n".
      String text = c.getText();
      if (text.startsWith("/**")) {
        // Ensure JSDoc comments are on their own line.  When comments are linked to
        // Nodes, inline JSDoc comments are removed since they are needed in Closure
        // but are not needed in TypeScript.  Thus, we don't need to worry about
        // inline JSDoc comments here.
        add(" \n");
      }
      add(text);
      add(" \n");
    }
  }

  @Override
  protected void add(Node n, Context ctx) {
    @Nullable Node parent = n.getParent();
    maybeAddNewline(n);

    if (experimentTracker.isEnabled(Experiment.USE_NODE_COMMENTS)) {
      addNewComments(astComments.getComments(n), nodeComments.getComments(n));
    } else {
      List<GeneralComment> comments = nodeComments.getComments(n);
      if (comments != null) {
        StringBuilder builder = new StringBuilder();
        for (GeneralComment c : comments) {
          builder.append('\n');
          builder.append(c.getText());
        }

        String allComments = builder.toString();
        if (!allComments.trim().isEmpty()) {
          add(" " + builder);
          // see the comment in the addNewComments() method above describing why it is necessary to
          // add " \n" instead of "\n" to add a newline
          add(" \n");
        }
      }
    }

    if (maybeOverrideCodeGen(n)) {
      return;
    }
    super.add(n, ctx);

    // Default field values
    switch (n.getToken()) {
      case MEMBER_VARIABLE_DEF:
        if (n.hasChildren()) {
          add(" = ");
          add(n.getLastChild());
        }
        break;
      case NEW:
        // The Closure Compiler code generator drops off the extra () for new statements.
        // We add them back in to maintain a consistent style.
        if (n.hasOneChild()) {
          add("()");
        }
        break;
      case FUNCTION_TYPE:
        // Match the "(" in maybeOverrideCodeGen for FUNCTION_TYPE nodes.
        if (parent != null && parent.getToken() == Token.UNION_TYPE) {
          add(")");
        }
        break;
      default:
        break;
    }
  }

  private static final ImmutableSet<Token> TOKENS_TO_ADD_NEWLINES_BEFORE =
      ImmutableSet.of(
          Token.CLASS, Token.EXPORT, Token.FUNCTION, Token.INTERFACE, Token.MEMBER_FUNCTION_DEF);

  /** Add newlines to the generated source. */
  private void maybeAddNewline(Node n) {
    boolean hasComment =
        nodeComments.hasComment(n)
            || nodeComments.hasComment(n.getParent())
            || isPreviousEmptyAndHasComment(n)
            || (n.getParent() != null && isPreviousEmptyAndHasComment(n.getParent()));

    if (!hasComment && TOKENS_TO_ADD_NEWLINES_BEFORE.contains(n.getToken())) {
      // CodeGernator.add("\n") doesn't append anything. Fixing the actual bug in Closure Compiler
      // is difficult. Works around the bug by passing " \n". The extra whitespace is stripped by
      // Closure and not emitted in the final output of Gents. An exception is when this is the
      // first line of file Closure doesn't strip the whitespace. TypeScriptGenerator has the
      // handling logic that removes leading empty lines, including "\n" and " \n".
      add(" \n");
    }
  }

  private boolean isPreviousEmptyAndHasComment(Node n) {
    if (n == null || n.getParent() == null) {
      return false;
    }
    Node prev = n.getPrevious();
    return prev != null && prev.isEmpty() && nodeComments.hasComment(prev);
  }

  /**
   * Attempts to seize control of code generation if necessary.
   *
   * @return true if no further code generation on this node is needed.
   */
  private boolean maybeOverrideCodeGen(Node n) {
    @Nullable Node parent = n.getParent();
    switch (n.getToken()) {
      case CLASS:
        // Get a list of generic types for this class declaration.
        @SuppressWarnings("unchecked") // TODO(lukemizuhashi): Cast is checked on line below.
        ImmutableList<String> genericTypeList =
            (n.getProp(Node.GENERIC_TYPE_LIST) instanceof ImmutableList)
                ? (ImmutableList<String>) n.getProp(Node.GENERIC_TYPE_LIST)
                : ImmutableList.<String>of();

        // Get references to all the child nodes of this class declaration.
        // CLASS               The keyword `class`.
        //   NAME              The name of this class.
        //   (EMPTY|NAME)      The name of the parent class, empty otherwise.
        //   CLASS_MEMBERS     The members of this class.
        Node className = n.getFirstChild();
        Node extendedClass = n.getSecondChild();
        Node classMemebers = n.getLastChild();

        // Get a list of generic types for this class declaration's parent class.
        @SuppressWarnings("unchecked") // TODO(lukemizuhashi): Cast is checked on line below.
        ImmutableList<String> extendedGenericTypeList =
            (extendedClass.getProp(Node.GENERIC_TYPE_LIST) instanceof ImmutableList)
                ? (ImmutableList<String>) extendedClass.getProp(Node.GENERIC_TYPE_LIST)
                : ImmutableList.<String>of();

        // If the generic type lists are empty for both this class declaration and its extended
        // class, there's no need to perform a custom emit.
        if (genericTypeList.isEmpty() && extendedGenericTypeList.isEmpty()) {
          return false;
        }

        add("class "); // CLASS

        add(className); // NAME
        if (!genericTypeList.isEmpty()) {
          add("<" + String.join(", ", genericTypeList) + ">"); // < GENERIC_TYPE_LIST >
        }

        if (extendedClass.isName()) {
          add("extends ");
        }

        add(extendedClass); // (EMPTY|NAME)
        if (extendedClass.isName() && !extendedGenericTypeList.isEmpty()) {
          add("<" + String.join(", ", extendedGenericTypeList) + ">"); // < GENERIC_TYPE_LIST >
        }

        add(classMemebers);
        return true;
      case INDEX_SIGNATURE:
        Node first = n.getFirstChild();
        if (null != first) {
          add("{[");
          add(first);
          add(":");
          add(first.getDeclaredTypeExpression());
          add("]:");
          add(n.getDeclaredTypeExpression());
          add("}");
        }
        return true;
      case UNDEFINED_TYPE:
        add("undefined");
        return true;
      case CAST:
        add("(");
        add(n.getFirstChild());
        add(" as ");
        add(n.getDeclaredTypeExpression());
        add(")");
        return true;
      case NUMBER:
      case STRING:
        try {
          String src = extractor.getSource(n);
          // Do not use the literal text for goog.require statements
          // because those statements should be replaced with import
          // statements.
          if (src != null && !src.contains("goog.require")) {
            add(src);
            return true;
          }
          return false;
        } catch (IOException e) {
          // there was a problem reading the source file
          // so have the generator use the default emit
          return false;
        }
      case DEFAULT_VALUE:
      case NAME:
        // Prepend access modifiers on constructor params
        if (n.getParent().isParamList()) {
          Visibility visibility = (Visibility) n.getProp(Node.ACCESS_MODIFIER);
          if (visibility != null) {
            switch (visibility) {
              case PRIVATE:
                add("private ");
                break;
              case PROTECTED:
                add("protected ");
                break;
              case PUBLIC:
                add("public ");
                break;
              default:
                break;
            }
          }

          if (n.getBooleanProp(Node.IS_CONSTANT_NAME)) {
            add("readonly ");
          }
        }
        return false;
      case ANY_TYPE:
        // Check the externsMap for an alias to use in place of "any"
        String anyTypeName = externsMap.get("any");
        if (anyTypeName != null) {
          add(anyTypeName);
          return true;
        }
        return false;
      case EXPORT:
        // When a type alias is exported, closure code generator will add two semi-colons, one for
        // type alias and one for export
        // For example: export type T = {key: string};;
        if (!n.hasOneChild()) {
          return false;
        }
        if (n.getFirstChild().getToken() == Token.TYPE_ALIAS) {
          add("export");
          add(n.getFirstChild());
          return true;
        }
        return false;
      case FUNCTION_TYPE:
        // In some cases we need to add a pair of "(" and ")" around the function type. We don't
        // want to override the default code generation for FUNCTION_TYPE because the default code
        // generation uses private APIs. Therefore we emit a "(" here, then let the default code
        // generation for FUNCTION_TYPE emit and finally emit a ")" after maybeOverrideCodeGen.
        // Union binding has higher precedence than "=>" in TypeScript.
        if (parent != null && parent.getToken() == Token.UNION_TYPE) {
          add("(");
        }
        return false;
      default:
        return false;
    }
  }
}
