package com.google.javascript.gents;

import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.Map;

/**
 * Code generator for gents to add TypeScript specific code generation.
 */
public class GentsCodeGenerator extends CodeGenerator {
  private final NodeComments nodeComments;
  private final Map<String, String> externsMap;

  protected GentsCodeGenerator(CodeConsumer consumer, CompilerOptions options,
      NodeComments nodeComments, Map<String, String> externsMap) {
    super(consumer, options);
    this.nodeComments = nodeComments;
    this.externsMap = externsMap;
  }

  @Override
  protected void add(Node n, Context ctx) {
    String comment = nodeComments.getComment(n);
    if (comment != null) {
      add(comment);
      // temporary new line
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

    addNewlines(n);
  }

  /** Add newlines to the generated source */
  private void addNewlines(Node n) {
    Node nextNode = n.getNext();
    if (nextNode != null) {
      int lineSpacing = nextNode.getLineno() - n.getLineno();

      // Add an empty line if:
      //   - the next node is further away than the next line
      //   - the next node is a class function (but the current node is not a comment)
      if (lineSpacing > 1 ||
          (nextNode.getToken() == Token.MEMBER_FUNCTION_DEF && n.getToken() != Token.EMPTY)) {
        add("\n");
      }
    }
  }

  /**
   * Attempts to seize control of code generation if necessary.
   * @return true if no further code generation on this node is needed.
   */
  boolean maybeOverrideCodeGen(Node n) {
    switch(n.getToken()) {
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
      default:
        return false;
    }
  }
}
