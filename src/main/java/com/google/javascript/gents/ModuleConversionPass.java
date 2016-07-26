package com.google.javascript.gents;

import com.google.common.base.Preconditions;
import com.google.javascript.gents.CollectModuleMetadata.FileModule;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

/**
 * Converts Closure-style modules into TypeScript (ES6) modules (not namespaces).
 * All module metadata must be populated before running this CompilerPass.
 */
public final class ModuleConversionPass implements CompilerPass {

  private final AbstractCompiler compiler;
  private final Map<String, FileModule> fileToModule;
  private final Map<String, FileModule> namespaceToModule;

  public ModuleConversionPass(AbstractCompiler compiler,
      Map<String, FileModule> fileToModule, Map<String, FileModule> namespaceToModule) {
    this.compiler = compiler;
    this.fileToModule = fileToModule;
    this.namespaceToModule = namespaceToModule;
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
  private class ModuleExportConverter extends AbstractTopLevelCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      String filename = n.getSourceFileName();
      if (n.isScript()) {
        if (fileToModule.containsKey(filename)) {
          // Module is declared purely for side effects
          if (!fileToModule.get(filename).hasExports()) {
            // export {};
            // TODO(renez): Add comment to explain that this statement is used to change file
            // into a module.
            Node exportNode = new Node(Token.EXPORT, new Node(Token.EXPORT_SPECS));
            n.addChildToFront(exportNode);
          }
        }
      }

      if (!n.isExprResult()) {
        return;
      }

      Node child = n.getFirstChild();
      switch (child.getType()) {
        case CALL:
          String callName = child.getFirstChild().getQualifiedName();
          if ("goog.module".equals(callName) || "goog.provide".equals(callName)) {
            // Remove the goog.module and goog.provide calls.
            n.detachFromParent();
            compiler.reportCodeChange();
          }
          break;
        case ASSIGN:
          if (!fileToModule.containsKey(filename)) {
            break;
          }
          FileModule module = fileToModule.get(filename);
          Node lhs = child.getFirstChild();
          Map<String, String> symbols = module.exportedSymbols;

          // We export the longest valid prefix
          String exportedNamespace = findLongestNamespacePrefix(lhs, symbols.keySet());
          if (exportedNamespace != null) {
            convertExportAssignment(child, exportedNamespace, symbols.get(exportedNamespace));
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
  private class ModuleImportConverter extends AbstractTopLevelCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (isBinding(n)) {
        // var x = goog.require(...);
        Node callNode = n.getFirstFirstChild();
        if (callNode == null || !callNode.isCall()) {
          return;
        }

        if ("goog.require".equals(callNode.getFirstChild().getQualifiedName())) {
          String requiredNamespace = callNode.getLastChild().getString();
          String localName = n.getFirstChild().getQualifiedName();
          convertRequireToImportStatements(n, localName, requiredNamespace);
        }
      } else if (n.isExprResult()) {
        // goog.require(...);
        Node callNode = n.getFirstChild();
        if (callNode == null || !callNode.isCall()) {
          return;
        }
        if ("goog.require".equals(callNode.getFirstChild().getQualifiedName())) {
          String requiredNamespace = callNode.getLastChild().getString();
          String localName = lastStepOfPropertyPath(requiredNamespace);
          convertRequireToImportStatements(n, localName, requiredNamespace);
        }
      }
    }
  }

  /**
   * Converts a Closure goog.require call into a TypeScript import statement.
   *
   * The resulting node is dependent on the exports by the module being imported:
   * import {A as localName} from "./valueExports";
   * import * as localName from "./objectExports";
   * import "./sideEffectsOnly"
   */
  void convertRequireToImportStatements(Node n, String localName, String requiredNamespace) {
    if (!namespaceToModule.containsKey(requiredNamespace)) {
      compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
          String.format("Module %s does not exist.", requiredNamespace)));
      return;
    }

    FileModule module = namespaceToModule.get(requiredNamespace);
    String referencedFile = module.file;
    // TODO(renez): handle absolute paths if referenced module is not 'nearby' source module.
    referencedFile = getRelativePath(n.getSourceFileName(), referencedFile);
    String moduleSuffix = lastStepOfPropertyPath(requiredNamespace);
    // Avoid name collisions
    String backupName = moduleSuffix.equals(localName) ? moduleSuffix + "Exports" : moduleSuffix;

    boolean imported = false;
    if (module.importedSymbols.containsKey(requiredNamespace)) {
      // import {value as localName} from "./file"
      Node importSpec = new Node(Token.IMPORT_SPEC, IR.name(moduleSuffix));
      // import {a as b} only when a =/= b
      if (!moduleSuffix.equals(localName)) {
        importSpec.addChildToBack(IR.name(localName));
      }

      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          new Node(Token.IMPORT_SPECS, importSpec),
          Node.newString(referencedFile));
      n.getParent().addChildBefore(importNode, n);
      imported = true;
      // Switch to back up name if necessary
      localName = backupName;
    }

    if (module.providesObject.get(requiredNamespace)) {
      // import * as var from "./file"
      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          Node.newString(Token.IMPORT_STAR, localName),
          Node.newString(referencedFile));
      n.getParent().addChildBefore(importNode, n);
      imported = true;
    }

    if (!imported) {
      // side effects only
      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          IR.empty(),
          Node.newString(referencedFile));
      n.getParent().addChildBefore(importNode, n);
    }

    n.getParent().removeChild(n);
    compiler.reportCodeChange();
  }

  /**
   * Converts a Closure assignment on a goog.module or goog.provide namespace into
   * a TypeScript export statement.
   * This method should only be called on a node within a module.
   *
   * @param assign Assignment node
   * @param exportedNamespace The prefix of the assignment name that we are exporting
   * @param exportedSymbol The symbol that we want to export from the file
   * For example,
   * convertExportAssignment(pre.fix = ..., "pre.fix", "name") <-> export const name = ...
   * convertExportAssignment(pre.fix.foo = ..., "pre.fix", "name") <-> name.foo = ...
   */
  void convertExportAssignment(Node assign, String exportedNamespace, String exportedSymbol) {
    Preconditions.checkState(assign.isAssign());
    Preconditions.checkState(assign.getParent().isExprResult());

    Node exprNode = assign.getParent();
    Node lhs = assign.getFirstChild();
    Node rhs = assign.getLastChild();
    JSDocInfo jsDoc = NodeUtil.getBestJSDocInfo(assign);

    if (exportedNamespace.equals(lhs.getQualifiedName())) {
      // Generate new export statement
      rhs.detachFromParent();
      Node exportNode = IR.constNode(IR.name(exportedSymbol), rhs);
      exportNode.setJSDocInfo(jsDoc);
      exprNode.getParent().replaceChild(exprNode, new Node(Token.EXPORT, exportNode));
    } else {
      // Assume prefix has already been exported and just trim the prefix
      replacePrefixInPath(lhs, exportedNamespace, exportedSymbol);
    }

    compiler.reportCodeChange();
  }

  /** Returns if the node {@code n} is either a var, let or const declaration. */
  boolean isBinding(Node n) {
    if (n.isVar() || n.isLet() || n.isConst()) {
      return n.getFirstChild().isName();
    }
    return false;
  }

  /** Returns the relative path between the source file and the referenced module file. */
  String getRelativePath(String sourceFile, String referencedFile) {
    Path from = Paths.get(sourceFile, "..").normalize();
    Path to = Paths.get(TypeScriptGenerator.removeExtension(referencedFile)).normalize();
    Path importPath = from.relativize(to).normalize();
    return importPath.toString().startsWith(".") ?
        importPath.toString() :
        "./" + importPath.toString();
  }

  /**
   * Gets the longest namespace that is a prefix of the name node.
   * Returns null if no namespaces are valid prefixes.
   */
  @Nullable
  String findLongestNamespacePrefix(Node name, Set<String> namespaces) {
    if (namespaces.contains(name.getQualifiedName())) {
      return name.getQualifiedName();
    } else if (name.isGetProp()) {
      return findLongestNamespacePrefix(name.getFirstChild(), namespaces);
    }
    return null;
  }

  /** Returns the last identifier of a qualified name string. */
  String lastStepOfPropertyPath(String name) {
    Node n = NodeUtil.newQName(compiler, name);
    return n.isGetProp() ? n.getLastChild().getString() : n.getQualifiedName();
  }

  /**
   * In-place removes a prefix from a name node.
   * Does nothing if prefix does not exist.
   */
  void replacePrefixInPath(Node name, String prefix, String newPrefix) {
    if (prefix.equals(name.getQualifiedName())) {
      name.getParent().replaceChild(name, IR.name(newPrefix));
    } else {
      if (name.isGetProp()) {
        replacePrefixInPath(name.getFirstChild(), prefix, newPrefix);
      }
    }
  }
}
