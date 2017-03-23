package com.google.javascript.gents;

import com.google.common.collect.ImmutableSet;
import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.Map;

/** Code generator for gents to add TypeScript specific code generation. */
public class GentsCodeGenerator extends CodeGenerator {
  private final NodeComments nodeComments;
  private final Map<String, String> externsMap;

  protected GentsCodeGenerator(
      CodeConsumer consumer,
      CompilerOptions options,
      NodeComments nodeComments,
      Map<String, String> externsMap) {
    super(consumer, options);
    this.nodeComments = nodeComments;
    this.externsMap = externsMap;
  }

  @Override
  protected void add(Node n, Context ctx) {
    maybeAddNewline(n);

    String comment = nodeComments.getComment(n);
    if (comment != null) {
      add(comment);
      add("\n");
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
      add("\n");
    }
  }

  private boolean isPreviousEmptyAndHasComment(Node n) {
    if (n == null || n.getParent() == null) {
      return false;
    }
    Node prev = n.getPrevious();
    return prev != null && prev.getToken() == Token.EMPTY && nodeComments.hasComment(prev);
  }

  /**
   * Attempts to seize control of code generation if necessary.
   *
   * @return true if no further code generation on this node is needed.
   */
  boolean maybeOverrideCodeGen(Node n) {
    switch (n.getToken()) {
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
        // When a type alias is exported, closure code generator will add two semi-colons, one for type alias and one for export
        // For example: export type T = {key: string};;
        if (n.getChildCount() != 1) {
          return false;
        }
        if (n.getFirstChild().getToken() == Token.TYPE_ALIAS) {
          add("export");
          add(n.getFirstChild());
          return true;
        }
        return false;
      default:
        return false;
    }
  }
}
