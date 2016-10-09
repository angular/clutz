package com.google.javascript.gents;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;

import com.google.common.base.MoreObjects;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Table;
import com.google.javascript.gents.CollectModuleMetadata.FileModule;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPreOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * Converts Closure-style modules into TypeScript (ES6) modules (not namespaces).
 * All module metadata must be populated before running this CompilerPass.
 */
public final class ModuleConversionPass implements CompilerPass {

  private static final String EXPORTS = "exports";

  private final AbstractCompiler compiler;
  private final PathUtil pathUtil;
  private final NameUtil nameUtil;
  private final NodeComments nodeComments;

  private final Map<String, FileModule> fileToModule;
  private final Map<String, FileModule> namespaceToModule;
  private final Set<ExportedSymbol> directlyExportedSymbols = new HashSet<>();
  private final Map<ExportedSymbol, Node> exportsToNodes = new HashMap<>();

  // Used for rewriting usages of imported symbols
  /** filename, namespace -> local name */
  private final Table<String, String, String> valueRewrite = HashBasedTable.create();
  /** filename, namespace -> local name */
  private final Table<String, String, String> typeRewrite = HashBasedTable.create();

  public Table<String, String, String> getTypeRewrite() {
    return typeRewrite;
  }

  public ModuleConversionPass(AbstractCompiler compiler, PathUtil pathUtil, NameUtil nameUtil,
      Map<String, FileModule> fileToModule, Map<String, FileModule> namespaceToModule,
      NodeComments nodeComments) {
    this.compiler = compiler;
    this.pathUtil = pathUtil;
    this.nameUtil = nameUtil;
    this.nodeComments = nodeComments;

    this.fileToModule = fileToModule;
    this.namespaceToModule = namespaceToModule;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, new ModuleExportConverter());
    NodeTraversal.traverseEs6(compiler, root, new ModuleImportConverter());
    NodeTraversal.traverseEs6(compiler, root, new ModuleImportRewriter());
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

            if (n.hasChildren() && n.getFirstChild().isModuleBody()) {
              n.getFirstChild().addChildToFront(exportNode);
            } else {
              n.addChildToFront(exportNode);
            }
          }
        }
      }

      if (!n.isExprResult()) {
        if (n.getToken() == Token.CONST
            || n.getToken() == Token.CLASS
            || n.getToken() == Token.FUNCTION) {
          directlyExportSymbol(n, parent, filename);
        }
        return;
      }

      Node child = n.getFirstChild();
      switch (child.getToken()) {
        case CALL:
          String callName = child.getFirstChild().getQualifiedName();
          if ("goog.module".equals(callName) || "goog.provide".equals(callName)) {
            // Remove the goog.module and goog.provide calls.
            n.detachFromParent();
            compiler.reportCodeChange();
          }
          break;
        case GETPROP: {
          JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(child);
          if (jsdoc == null || !jsdoc.containsTypeDefinition()) {
            // GETPROPs on the root level are only exports for @typedefs
            break;
          }
          if (!fileToModule.containsKey(filename)) {
            break;
          }
          FileModule module = fileToModule.get(filename);
          Map<String, String> symbols = module.exportedNamespacesToSymbols;
          String exportedNamespace = nameUtil.findLongestNamePrefix(child, symbols.keySet());
          if (exportedNamespace != null) {
            String localName = symbols.get(exportedNamespace);
            Node export = new Node(Token.EXPORT, new Node(Token.EXPORT_SPECS,
                new Node(Token.EXPORT_SPEC, Node.newString(Token.NAME, localName))));
            parent.addChildAfter(export, n);
            // Registers symbol for rewriting local uses.
            registerLocalSymbol(
                child.getSourceFileName(), exportedNamespace, exportedNamespace, localName);
          }
          break;
        }
        case ASSIGN:
          if (!fileToModule.containsKey(filename)) {
            break;
          }
          FileModule module = fileToModule.get(filename);
          Node lhs = child.getFirstChild();
          Map<String, String> symbols = module.exportedNamespacesToSymbols;

          // We export the longest valid prefix
          String exportedNamespace = nameUtil.findLongestNamePrefix(lhs, symbols.keySet());
          if (exportedNamespace != null) {
            convertExportAssignment(
                child, exportedNamespace, symbols.get(exportedNamespace), filename);
            // Registers symbol for rewriting local uses
            registerLocalSymbol(
                child.getSourceFileName(),
                exportedNamespace,
                exportedNamespace,
                symbols.get(exportedNamespace));
          }
          break;
        default:
          break;
      }
    }

    private void directlyExportSymbol(Node namedNode, Node parent, String filename) {
      if (!fileToModule.containsKey(filename)) {
        return;
      }
      FileModule module = fileToModule.get(filename);
      Node child = namedNode.getFirstChild();
      String nodeName = checkNotNull(child.getQualifiedName());

      ExportedSymbol exportedSymbol = ExportedSymbol.of(filename, nodeName, nodeName);
      if (module.exportedNamespacesToSymbols.containsValue(nodeName)) {
        Node next = namedNode.getNext();
        namedNode.detachFromParent();

        Node export = new Node(Token.EXPR_RESULT, new Node(Token.EXPORT, namedNode));
        nodeComments.moveComment(namedNode, export);
        parent.addChildBefore(export, next);
        directlyExportedSymbols.add(exportedSymbol);
        compiler.reportCodeChange();
      } else {
        exportsToNodes.put(exportedSymbol, namedNode);
      }
    }
  }

  /**
   * Converts goog.require statements into TypeScript import statements.
   */
  private class ModuleImportConverter extends AbstractTopLevelCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (NodeUtil.isNameDeclaration(n)) {
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
          convertRequireToImportStatements(n, requiredNamespace, requiredNamespace);
        }
      }
    }
  }

  /**
   * Rewrites variable names used in the file to correspond to the newly imported symbols.
   */
  private class ModuleImportRewriter extends AbstractPreOrderCallback {
    @Override
    public boolean shouldTraverse(NodeTraversal t, Node n, Node parent) {
      // Rewrite all imported variable name usages
      if (n.isName() || n.isGetProp()) {
        if (!valueRewrite.containsRow(n.getSourceFileName())) {
          return true;
        }

        Map<String, String> rewriteMap = valueRewrite.rowMap().get(n.getSourceFileName());
        String importedNamespace = nameUtil.findLongestNamePrefix(n, rewriteMap.keySet());
        if (importedNamespace != null) {
          nameUtil.replacePrefixInName(n, importedNamespace, rewriteMap.get(importedNamespace));
          return false;
        }
      }
      return true;
    }
  }

  /**
   * Converts a Closure goog.require call into a TypeScript import statement.
   *
   * The resulting node is dependent on the exports by the module being imported:
   * import localName from "goog:old.namespace.syntax";
   * import {A as localName} from "./valueExports";
   * import * as localName from "./objectExports";
   * import "./sideEffectsOnly"
   */
  void convertRequireToImportStatements(Node n, String fullLocalName, String requiredNamespace) {
    if (!namespaceToModule.containsKey(requiredNamespace)) {
      compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
          String.format("Module %s does not exist.", requiredNamespace)));
      return;
    }

    // Local name is the shortened namespace symbol
    String localName = nameUtil.lastStepOfName(fullLocalName);

    FileModule module = namespaceToModule.get(requiredNamespace);
    String moduleSuffix = nameUtil.lastStepOfName(requiredNamespace);
    // Avoid name collisions
    String backupName = moduleSuffix.equals(localName) ? moduleSuffix + "Exports" : moduleSuffix;

    // Uses default import syntax as this is a javascript namespace
    if (module.shouldUseOldSyntax()) {
      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          Node.newString(Token.NAME, localName),
          Node.newString("goog:" + requiredNamespace));
      nodeComments.replaceWithComment(n, importNode);
      compiler.reportCodeChange();

      registerLocalSymbol(n.getSourceFileName(), fullLocalName, requiredNamespace, localName);
      return;
    }

    String referencedFile = pathUtil.getImportPath(n.getSourceFileName(), module.file);

    boolean imported = false;
    if (module.importedNamespacesToSymbols.containsKey(requiredNamespace)) {
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
      nodeComments.moveComment(n, importNode);
      imported = true;

      registerLocalSymbol(n.getSourceFileName(), fullLocalName, requiredNamespace, localName);
      // Switch to back up name if necessary
      localName = backupName;
    }

    if (module.providesObjectChildren.get(requiredNamespace).size() > 0) {
      // import * as var from "./file"
      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          Node.newString(Token.IMPORT_STAR, localName),
          Node.newString(referencedFile));
      n.getParent().addChildBefore(importNode, n);
      nodeComments.moveComment(n, importNode);
      imported = true;

      for (String child : module.providesObjectChildren.get(requiredNamespace)) {
        if (!valueRewrite.contains(n.getSourceFileName(), child)) {
          String filename = n.getSourceFileName();
          registerLocalSymbol(filename, fullLocalName + '.' + child,
              requiredNamespace + '.' + child, localName + '.'+ child);
        }
      }
    }

    if (!imported) {
      // side effects only
      Node importNode = new Node(Token.IMPORT,
          IR.empty(),
          IR.empty(),
          Node.newString(referencedFile));
      n.getParent().addChildBefore(importNode, n);
      nodeComments.moveComment(n, importNode);
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
   * @param filename the name of the containing file
   */
  void convertExportAssignment(
      Node assign, String exportedNamespace, String exportedSymbol, String filename) {
    checkState(assign.isAssign());
    checkState(assign.getParent().isExprResult());

    Node exprNode = assign.getParent();
    Node lhs = assign.getFirstChild();
    Node rhs = assign.getLastChild();
    JSDocInfo jsDoc = NodeUtil.getBestJSDocInfo(assign);

    ExportedSymbol symbolToExport =
        ExportedSymbol.fromExportAssignment(rhs, exportedNamespace, exportedSymbol, filename);

    // Check if the AST was already modified to directly export the node.  If it is, remove the
    // export declaration.
    if (directlyExportedSymbols.contains(symbolToExport)) {
      exprNode.detachFromParent();
      compiler.reportCodeChange();
      return;
    }

    if (exportedNamespace.equals(lhs.getQualifiedName())) {
      rhs.detachFromParent();
      Node exportSpecNode;
      if (rhs.isName()
          && (exportedNamespace.equals(EXPORTS) && exportsToNodes.containsKey(symbolToExport))) {
        // Rewrite the AST to export the symbol directly using information from the export
        // assignment.
        Node namedNode = exportsToNodes.get(symbolToExport);
        Node next = namedNode.getNext();
        Node parent = namedNode.getParent();
        namedNode.detachFromParent();

        Node export = new Node(Token.EXPR_RESULT, new Node(Token.EXPORT, namedNode));

        nodeComments.moveComment(namedNode, export);
        parent.addChildBefore(export, next);
        exprNode.detachFromParent();

        directlyExportedSymbols.add(symbolToExport);
        compiler.reportCodeChange();
        return;

      } else if (rhs.isName() && exportedSymbol.equals(rhs.getString())) {
        // Rewrite the export line to: <code>export {rhs}</code>.
        exportSpecNode = new Node(Token.EXPORT_SPECS, new Node(Token.EXPORT_SPEC, rhs));
      } else {
        // Rewrite the export line to: <code>export const exportedSymbol = rhs</code>.
        exportSpecNode = IR.constNode(IR.name(exportedSymbol), rhs);
      }
      exportSpecNode.setJSDocInfo(jsDoc);
      Node exportNode = new Node(Token.EXPORT, exportSpecNode);
      nodeComments.replaceWithComment(exprNode, exportNode);

    } else {
      // Assume prefix has already been exported and just trim the prefix
      nameUtil.replacePrefixInName(lhs, exportedNamespace, exportedSymbol);
    }

    compiler.reportCodeChange();
  }

  /**
   * Saves the local name for imported symbols to be used for code rewriting later.
   */
  void registerLocalSymbol(String sourceFile, String fullLocalName, String requiredNamespace,
      String localName) {
    valueRewrite.put(sourceFile, fullLocalName, localName);
    typeRewrite.put(sourceFile, fullLocalName, localName);
    typeRewrite.put(sourceFile, requiredNamespace, localName);
  }

  /** Metadata about an exported symbol. */
  private static class ExportedSymbol {
    /** The name of the file exporting the symbol. */
    final String filename;

    /**
     * The name that the symbol is declared in the module.
     *
     * <p>For example, {@code Foo} in: <code> class Foo {}</code>
     */
    final String localName;

    /**
     * The name that the symbol is exported under via named exports.
     *
     * <p>For example, {@code Bar} in: <code> exports {Bar}</code>.
     *
     * <p>If a symbol is directly exported, as in the case of <code>export class Foo {}</code>, the
     * {@link #localName} and {@link #exportedName} will both be {@code Foo}.
     */
    final String exportedName;

    private ExportedSymbol(String filename, String localName, String exportedName) {
      this.filename = checkNotNull(filename);
      this.localName = checkNotNull(localName);
      this.exportedName = checkNotNull(exportedName);
    }

    static ExportedSymbol of(String filename, String localName, String exportedName) {
      return new ExportedSymbol(filename, localName, exportedName);
    }

    static ExportedSymbol fromExportAssignment(
        Node rhs, String exportedNamespace, String exportedSymbol, String filename) {
      String localName = (rhs.getQualifiedName() != null) ? rhs.getQualifiedName() : exportedSymbol;

      String exportedName;
      if (exportedNamespace.equals(EXPORTS)) { // is a default export
        exportedName = localName;
      } else if (exportedNamespace.startsWith(EXPORTS)) { // is a named export
        exportedName =
            exportedNamespace.substring(EXPORTS.length() + 1, exportedNamespace.length());
      } else { // exported via goog.provide
        exportedName = "";
      }

      return new ExportedSymbol(filename, localName, exportedName);
    }

    @Override
    public String toString() {
      return MoreObjects.toStringHelper(getClass())
          .add("filename", filename)
          .add("localName", localName)
          .add("exportedName", exportedName)
          .toString();
    }

    @Override
    public int hashCode() {
      return Objects.hash(this.filename, this.localName, this.exportedName);
    }

    @Override
    public boolean equals(Object obj) {
      if (this == obj) {
        return true;
      }
      if (obj == null) {
        return false;
      }
      if (getClass() != obj.getClass()) {
        return false;
      }
      ExportedSymbol that = (ExportedSymbol) obj;
      return Objects.equals(this.filename, that.filename)
          && Objects.equals(this.localName, that.localName)
          && Objects.equals(this.exportedName, that.exportedName);
    }
  }
}
