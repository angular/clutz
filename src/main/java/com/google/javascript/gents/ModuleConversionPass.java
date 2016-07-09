package com.google.javascript.gents;

import com.google.common.base.Preconditions;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Converts Closure-style modules into TypeScript (ES6) modules (not namespaces).
 */
public final class ModuleConversionPass extends AbstractPostOrderCallback implements CompilerPass {

  static final DiagnosticType GENTS_MODULE_PASS_ERROR = DiagnosticType.error(
      "GENTS_MODULE_PASS_ERROR", "{0}");

  private final AbstractCompiler compiler;
  private final Map<String, String> fileToModule;

  public ModuleConversionPass(AbstractCompiler compiler) {
    this.compiler = compiler;
    this.fileToModule = new LinkedHashMap<>();
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    switch (n.getType()) {
      case CALL:
        if ("goog.module".equals(n.getFirstChild().getQualifiedName())) {
          if (!parent.getParent().isScript() || // is top level
              !parent.getParent().getFirstChild().equals(parent)) { // is first statement
            compiler.report(JSError.make(n, GENTS_MODULE_PASS_ERROR,
                "goog.module must be the first top level statement."));
            break;
          }
          fileToModule.put(n.getSourceFileName(), n.getLastChild().getString());
          // Remove the goog.module call.
          n.getParent().detachFromParent();
        }
        break;
      case ASSIGN:
        // Only convert inside goog.module files
        if ("exports".equals(getPrefix(n.getFirstChild())) &&
            fileToModule.containsKey(n.getSourceFileName())) {
          if (!parent.getParent().isScript()) { // is top level
            compiler.report(JSError.make(n, GENTS_MODULE_PASS_ERROR,
                "goog.module exports must be top level."));
            break;
          }
          convertExportAssignment(n);
        }
        break;
      default:
        break;
    }
  }

  /**
   * Converts a Closure exports assignment into a TypeScript export statement.
   *
   * For example, converts:
   *
   * goog.module("A.B.C");
   * exports = ...;
   * exports.foo = ...;
   * exports.foo.x = ...;
   *
   * to
   *
   * export const C = ...;
   * export const foo = ...;
   * foo.x = ...;
   */
  void convertExportAssignment(Node assign) {
    Preconditions.checkState(assign.isAssign());
    Preconditions.checkState(assign.getParent().isExprResult());

    Node exprNode = assign.getParent();
    Node lhs = assign.getFirstChild();
    Node rhs = assign.getLastChild();
    JSDocInfo jsDoc = NodeUtil.getBestJSDocInfo(assign);

    Node exportNode;
    if (lhs.isName()) {
      // exports = ...
      String module = fileToModule.get(assign.getSourceFileName());
      if (module == null) {
        return;
      }
      String moduleSuffix = getSuffix(NodeUtil.newQName(compiler, module));

      rhs.detachFromParent();
      exportNode = IR.constNode(IR.name(moduleSuffix), rhs);
    } else if (lhs.isGetProp() && lhs.getFirstChild().isName()) {
      // exports.foo = ...
      rhs.detachFromParent();
      exportNode = IR.constNode(IR.name(lhs.getLastChild().getString()), rhs);
    } else {
      // exports.A.B.foo = ...
      // This implicitly assumes that the prefix has already been exported elsewhere.
      // The prefix is trimmed and nothing is exported in order to avoid any possible collisions.
      removePrefix(lhs);
      compiler.reportCodeChange();
      return;
    }

    exportNode.setJSDocInfo(jsDoc);
    exprNode.getParent().replaceChild(exprNode, new Node(Token.EXPORT, exportNode));
    compiler.reportCodeChange();
  }

  /**
   * Returns the prefix of a name node.
   */
  String getPrefix(Node name) {
    return name.isGetProp() ? getPrefix(name.getFirstChild()) : name.getQualifiedName();
  }

  /**
   * Returns the suffix of a name node.
   */
  String getSuffix(Node name) {
    return name.isGetProp() ? name.getLastChild().getString() : name.getQualifiedName();
  }

  /**
   * In-place removes the prefix from a name node.
   */
  void removePrefix(Node name) {
    Preconditions.checkState(name.isGetProp());
    if (name.getFirstChild().isName()) {
      String newPrefix = name.getLastChild().getString();
      name.getParent().replaceChild(name, IR.name(newPrefix));
    } else {
      removePrefix(name.getFirstChild());
    }
  }
}
