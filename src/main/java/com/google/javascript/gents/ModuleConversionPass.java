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

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Converts Closure-style modules into TypeScript (ES6) modules (not namespaces).
 */
public final class ModuleConversionPass implements CompilerPass {

  static final DiagnosticType GENTS_MODULE_PASS_ERROR = DiagnosticType.error(
      "GENTS_MODULE_PASS_ERROR", "{0}");

  private final AbstractCompiler compiler;
  private final Map<String, FileModule> fileToModule;
  private final Map<String, FileModule> namespaceToModule;

  public ModuleConversionPass(AbstractCompiler compiler) {
    this.compiler = compiler;
    this.fileToModule = new HashMap<>();
    this.namespaceToModule = new HashMap<>();
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, new ModuleExportConverter());
    NodeTraversal.traverseEs6(compiler, root, new ModuleImportConverter());
  }

  /**
   * Converts "exports" assignments into TypeScript export statements.
   * This also builds a map of all the declared modules.
   */
  private class ModuleExportConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getType()) {
        case SCRIPT:
          if (fileToModule.containsKey(n.getSourceFileName())) {
            FileModule module = fileToModule.get(n.getSourceFileName());
            // Module is declared purely for side effects
            if (!module.exportsDefault && !module.exportsNamespace) {
              // export {};
              // TODO(renez): Add comment to explain that this statement is used to change file
              // into a module.
              Node exportNode = new Node(Token.EXPORT, new Node(Token.EXPORT_SPECS));
              n.addChildToFront(exportNode);
            }
          }
          break;
        case CALL:
          if ("goog.module".equals(n.getFirstChild().getQualifiedName())) {
            if (!parent.getParent().isScript() || // is top level
                !parent.getParent().getFirstChild().equals(parent)) { // is first statement
              compiler.report(JSError.make(n, GENTS_MODULE_PASS_ERROR,
                  "goog.module must be the first top level statement."));
              break;
            }
            registerModule(n.getSourceFileName(), n.getLastChild().getString());
            // Remove the goog.module call.
            n.getParent().detachFromParent();
            compiler.reportCodeChange();
          }
          break;
        case ASSIGN:
          // Only convert inside goog.module files
          if ("exports".equals(firstStepOfPropertyPath(n.getFirstChild())) &&
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
  }

  /**
   * Converts goog.require statements into TypeScript import statements.
   */
  private class ModuleImportConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (isBinding(n)) {
        Node callNode = n.getFirstFirstChild();
        if (callNode == null || !callNode.isCall()) {
          return;
        }

        if ("goog.require".equals(callNode.getFirstChild().getQualifiedName())) {
          convertRequireToImportStatement(n);
        }
      }
    }
  }

  /**
   * Converts a Closure goog.require assignment into a TypeScript import statement.
   *
   * The resulting node is dependent on the exports by the module being imported:
   * import {A as defaultExport} from "./filenameA";
   * import * as namespaceExport from "./filenameB";
   * import "./sideEffectsOnly"
   */
  void convertRequireToImportStatement(Node topLevelImport) {
    String localName = topLevelImport.getFirstChild().getQualifiedName();
    Node callNode = topLevelImport.getFirstFirstChild();

    String requiredNamespace = callNode.getLastChild().getString();
    FileModule module = namespaceToModule.get(requiredNamespace);
    String referencedFile = module.file;
    if (referencedFile == null) {
      compiler.report(JSError.make(topLevelImport, GENTS_MODULE_PASS_ERROR,
          String.format("Module %s does not exist.", requiredNamespace)));
      return;
    }

    // TODO(renez): handle absolute paths if referenced module is not 'nearby' source module.
    referencedFile = getRelativePath(topLevelImport.getSourceFileName(), referencedFile);

    Node importNode;
    if (module.exportsDefault) {
      // import {module as var} from "./file"
      String moduleSuffix = lastStepOfPropertyPath(NodeUtil.newQName(compiler, requiredNamespace));
      Node importSpec = new Node(Token.IMPORT_SPEC, IR.name(moduleSuffix));
      // import {a as b} only when a =/= b
      if (!moduleSuffix.equals(localName)) {
        importSpec.addChildToBack(IR.name(localName));
      }

      importNode = new Node(Token.IMPORT,
          IR.empty(),
          new Node(Token.IMPORT_SPECS, importSpec),
          Node.newString(referencedFile));
    } else if (module.exportsNamespace) {
      // import * as var from "./file"
      importNode = new Node(Token.IMPORT,
          IR.empty(),
          Node.newString(Token.IMPORT_STAR, localName),
          Node.newString(referencedFile));
    } else {
      // side effects only
      importNode = new Node(Token.IMPORT,
          IR.empty(),
          IR.empty(),
          Node.newString(referencedFile));
    }

    topLevelImport.getParent().replaceChild(topLevelImport, importNode);
    compiler.reportCodeChange();
  }

  /**
   * Converts a Closure "exports" assignment into a TypeScript export statement.
   * This method should only be called on a node within a module.
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
      FileModule module = fileToModule.get(assign.getSourceFileName());
      String moduleSuffix = lastStepOfPropertyPath(NodeUtil.newQName(compiler, module.namespace));
      if (module.exportsNamespace) {
        compiler.report(JSError.make(assign, GENTS_MODULE_PASS_ERROR,
            String.format("Exporting both default and namespace values unsupported.")));
        return;
      }

      rhs.detachFromParent();
      exportNode = IR.constNode(IR.name(moduleSuffix), rhs);
      module.exportsDefault = true;
    } else if (lhs.isGetProp() && lhs.getFirstChild().isName()) {
      // exports.foo = ...
      FileModule module = fileToModule.get(assign.getSourceFileName());
      if (module.exportsDefault) {
        compiler.report(JSError.make(assign, GENTS_MODULE_PASS_ERROR,
            String.format("Exporting both default and namespace values unsupported.")));
        return;
      }

      rhs.detachFromParent();
      exportNode = IR.constNode(IR.name(lhs.getLastChild().getString()), rhs);
      module.exportsNamespace = true;
    } else {
      // exports.A.B.foo = ...
      // This implicitly assumes that the prefix has already been exported elsewhere.
      // The prefix is trimmed and nothing is exported in order to avoid any possible collisions.
      removeFirstStepOfPropertyPath(lhs);
      compiler.reportCodeChange();
      return;
    }

    exportNode.setJSDocInfo(jsDoc);
    exprNode.getParent().replaceChild(exprNode, new Node(Token.EXPORT, exportNode));
    compiler.reportCodeChange();
  }

  /**
   * Returns if the node {@code n} is either a var, let or const declaration.
   */
  boolean isBinding(Node n) {
    if (n.isVar() || n.isLet() || n.isConst()) {
      return n.getFirstChild().isName();
    }
    return false;
  }

  /**
   * Returns the relative path between the source file and the referenced module file for importing.
   */
  String getRelativePath(String sourceFile, String referencedFile) {
    Path from = Paths.get(sourceFile, "..").normalize();
    Path to = Paths.get(TypeScriptGenerator.removeExtension(referencedFile)).normalize();
    Path importPath = from.relativize(to).normalize();
    return importPath.toString().startsWith(".") ?
        importPath.toString() :
        "./" + importPath.toString();
  }

  /**
   * Returns the first identifier of a name node.
   */
  String firstStepOfPropertyPath(Node name) {
    return name.isGetProp() ?
        firstStepOfPropertyPath(name.getFirstChild()) :
        name.getQualifiedName();
  }

  /**
   * Returns the last identifier of a name node.
   */
  String lastStepOfPropertyPath(Node name) {
    return name.isGetProp() ? name.getLastChild().getString() : name.getQualifiedName();
  }

  /**
   * In-place removes the first identifier from a name node.
   */
  void removeFirstStepOfPropertyPath(Node name) {
    Preconditions.checkState(name.isGetProp());
    if (name.getFirstChild().isName()) {
      String newPrefix = name.getLastChild().getString();
      name.getParent().replaceChild(name, IR.name(newPrefix));
    } else {
      removeFirstStepOfPropertyPath(name.getFirstChild());
    }
  }

  /**
   * Registers a new module for future lookup.
   */
  void registerModule(String file, String namespace) {
    FileModule module = new FileModule(file, namespace);
    fileToModule.put(file, module);
    namespaceToModule.put(namespace, module);
  }

  /**
   * Encapsulates the module provided by each file.
   * TODO(renez): generalize this to handle goog.provides as well.
   */
  private static class FileModule {
    final String file;
    final String namespace;
    boolean exportsDefault;
    boolean exportsNamespace;

    private FileModule(String file, String namespace) {
      this.file = file;
      this.namespace = namespace;
    }
  }
}
