package com.google.javascript.jscomp;

import com.google.common.base.Preconditions;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.ArrayList;
import java.util.List;

/**
 * For any syntax which cannot be represented by the rhino AST (like the "implements" keyword)
 * we cannot re-write in a compiler pass. We must introduce this syntax as the code is generated.
 */
public class DTSCodeGenerator extends CodeGenerator {

  private final CodeConsumer cc;

  DTSCodeGenerator(CodeConsumer consumer, CompilerOptions options) {
    super(consumer, options);
    this.cc = consumer;
  }

  @Override
  void add(Node n, Context context) {
    int type = n.getType();
    int childCount = n.getChildCount();
    Node first = n.getFirstChild();
    Node last = n.getLastChild();

    switch (type) {
      // Same impl as superclass except print "interface" instead of "class"
      case Token.CLASS:
        Preconditions.checkState(childCount == 3);
        add("export declare ");
        boolean classNeedsParens = (context == Context.START_OF_EXPR);
        if (classNeedsParens) {
          add("(");
        }

        Node name = first;
        Node superClass = first.getNext();
        Node members = last;

        add(n.getJSDocInfo() != null && n.getJSDocInfo().isInterface() ? "interface" : "class");
        if (!name.isEmpty()) {
          add(name);
        }
        if (!superClass.isEmpty()) {
          add("extends");
          add(superClass);
        }
        if (n.getJSDocInfo() != null && !n.getJSDocInfo().getImplementedInterfaces().isEmpty()) {
          add("implements");
          for (JSTypeExpression implemented : n.getJSDocInfo().getImplementedInterfaces()) {
            add(implemented.getRoot().getFirstChild().getString());
          }
        }
        add(members);

        cc.endClass(context == Context.STATEMENT);

        if (classNeedsParens) {
          add(")");
        }
        break;

      // Same impl as superclass except we only print newline after member function, not property
      case Token.CLASS_MEMBERS:
        cc.beginBlock();
        for (Node c = first; c != null; c = c.getNext()) {
          add(c);
          if (c.getType() == Token.MEMBER_FUNCTION_DEF) {
            add(";");
            cc.endLine();
          }
        }
        cc.endBlock(false);
        break;

      default:
        super.add(n, context);
    }
  }
}
