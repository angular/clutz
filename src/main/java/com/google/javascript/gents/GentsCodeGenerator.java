package com.google.javascript.gents;

import com.google.javascript.jscomp.CodeConsumer;
import com.google.javascript.jscomp.CodeGenerator;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.rhino.Node;

/**
 * Code generator for gents to add TypeScript specific code generation.
 */
public class GentsCodeGenerator extends CodeGenerator {
  protected GentsCodeGenerator(CodeConsumer consumer, CompilerOptions options) {
    super(consumer, options);
  }

  @Override
  protected void add(Node n, Context context) {
    super.add(n, context);

    // Default field values
    if (n.isMemberVariableDef()) {
      if (n.hasChildren()) {
        add(" = ");
        add(n.getLastChild());
      }
    }
  }
}
