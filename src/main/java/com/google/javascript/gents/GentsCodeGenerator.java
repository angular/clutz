package com.google.javascript.gents;

import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

/**
 * Code generator for gents to add TypeScript specific code generation.
 */
public class GentsCodeGenerator extends CodeGenerator {
  protected GentsCodeGenerator(CodeConsumer consumer, CompilerOptions options) {
    super(consumer, options);
  }

  @Override
  protected void add(Node n, Context ctx) {
    if (maybeOverrideCodeGen(n, ctx)) {
      return;
    }
    super.add(n, ctx);

    // Default field values
    if (n.isMemberVariableDef()) {
      if (n.hasChildren()) {
        add(" = ");
        add(n.getLastChild());
      }
    }
  }

  /**
   * Attempts to seize control of code generation if necessary.
   * @return true if no further code generation on this node is needed.
   */
  boolean maybeOverrideCodeGen(Node n, Context ctx) {
    if (n.getType().equals(Token.UNDEFINED_TYPE)) {
      add("undefined");
      return true;
    }
    return false;
  }
}
