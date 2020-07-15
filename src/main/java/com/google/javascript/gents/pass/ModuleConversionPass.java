package com.google.javascript.gents.pass;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;

import com.google.common.base.MoreObjects;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Table;
import com.google.javascript.gents.GentsErrorManager;
import com.google.javascript.gents.pass.CollectModuleMetadata.FileModule;
import com.google.javascript.gents.pass.comments.GeneralComment;
import com.google.javascript.gents.pass.comments.NodeComments;
import com.google.javascript.gents.util.GentsNodeUtil;
import com.google.javascript.gents.util.NameUtil;
import com.google.javascript.gents.util.PathUtil;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * Converts Closure-style modules into TypeScript (ES6) modules (not namespaces). All module
 * metadata must be populated before running this CompilerPass.
 */
public final class ModuleConversionPass implements CompilerPass {

  private static final String EXPORTS = "exports";

  private final AbstractCompiler compiler;
  private final PathUtil pathUtil;
  private final NameUtil nameUtil;
  private final NodeComments nodeComments;
  private final NodeComments astComments;

  private final Map<String, FileModule> fileToModule;
  private final Map<String, FileModule> namespaceToModule;

  /**
   * Map of metadata about a potential export to the node that should be exported.
   *
   * <p>For example, in the case below, the {@code Node} would point to {@code class Foo}.
   * <code><pre>
   * class Foo {}
   * exports {Foo}
   * </pre><code>
   */
  private final Map<ExportedSymbol, Node> exportsToNodes = new HashMap<>();

  // Used for rewriting usages of imported symbols
  /** fileName, namespace -> local name */
  private final Table<String, String, String> valueRewrite = HashBasedTable.create();
  /** fileName, namespace -> local name */
  private final Table<String, String, String> typeRewrite = HashBasedTable.create();

  private final String binDirectory;
  private final String generatedDirectory;
  private final String absolutePathPrefix;

  private final Set<String> filesToConvert;

  public Table<String, String, String> getTypeRewrite() {
    return typeRewrite;
  }

  public ModuleConversionPass(
      AbstractCompiler compiler,
      PathUtil pathUtil,
      NameUtil nameUtil,
      Map<String, FileModule> fileToModule,
      Map<String, FileModule> namespaceToModule,
      NodeComments nodeComments,
      NodeComments astComments,
      String binDirectory,
      String generatedDirectory,
      String absolutePathPrefix,
      Set<String> filesToConvert) {
    this.compiler = compiler;
    this.pathUtil = pathUtil;
    this.nameUtil = nameUtil;
    this.nodeComments = nodeComments;
    this.astComments = astComments;

    this.fileToModule = fileToModule;
    this.namespaceToModule = namespaceToModule;
    this.binDirectory = binDirectory;
    this.generatedDirectory = generatedDirectory;
    this.absolutePathPrefix = absolutePathPrefix;
    this.filesToConvert = filesToConvert;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, new ModuleExportConverter());
    NodeTraversal.traverse(compiler, root, new ModuleImportConverter());
    NodeTraversal.traverse(compiler, root, new ModuleImportRewriter());
  }

  /**
   * Converts "exports" assignments into TypeScript export statements. This also builds a map of all
   * the declared modules.
   */
  private class ModuleExportConverter extends AbstractTopLevelCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      String fileName = n.getSourceFileName();
      if (n.isScript()) {
        if (fileToModule.containsKey(fileName)) {
          // Module is declared purely for side effects
          FileModule module = fileToModule.get(fileName);
          if (!module.hasImports() && !module.hasExports()) {
            // export {};
            Node commentNode = new Node(Token.EMPTY);
            commentNode.useSourceInfoFrom(n);
            nodeComments.addComment(
                commentNode,
                GeneralComment.from(
                    "\n// gents: force this file to be an ES6 module (no imports or exports)"));

            Node exportNode = new Node(Token.EXPORT, new Node(Token.EXPORT_SPECS, commentNode));
            commentNode.useSourceInfoFromForTree(n);

            if (n.hasChildren() && n.getFirstChild().isModuleBody()) {
              n.getFirstChild().addChildToFront(exportNode);
            } else {
              n.addChildToFront(exportNode);
            }
          }
        }
      }

      if (!n.isExprResult()) {
        if (n.isConst() || n.isClass() || n.isFunction() || n.isLet() || n.isConst() || n.isVar()) {
          collectMetdataForExports(n, fileName);
        }
        return;
      }

      Node child = n.getFirstChild();
      switch (child.getToken()) {
        case CALL:
          String callName = child.getFirstChild().getQualifiedName();
          if ("goog.module".equals(callName) || "goog.provide".equals(callName)) {
            // Remove the goog.module and goog.provide calls.
            if (nodeComments.hasComment(n)) {
              nodeComments.replaceWithComment(n, new Node(Token.EMPTY));
            } else {
              compiler.reportChangeToEnclosingScope(n);
              n.detach();
            }
          }
          break;
        case GETPROP:
          {
            JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(child);
            if (jsdoc == null || !jsdoc.containsTypeDefinition()) {
              // GETPROPs on the root level are only exports for @typedefs
              break;
            }
            if (!fileToModule.containsKey(fileName)) {
              break;
            }
            FileModule module = fileToModule.get(fileName);
            Map<String, String> symbols = module.exportedNamespacesToSymbols;
            String exportedNamespace = nameUtil.findLongestNamePrefix(child, symbols.keySet());
            if (exportedNamespace != null) {
              String localName = symbols.get(exportedNamespace);
              Node export =
                  new Node(Token.EXPORT, createExportSpecs(Node.newString(Token.NAME, localName)));
              export.useSourceInfoFromForTree(child);
              parent.addChildAfter(export, n);
              // Registers symbol for rewriting local uses.
              registerLocalSymbol(
                  child.getSourceFileName(), exportedNamespace, exportedNamespace, localName);
            }
            break;
          }
        case ASSIGN:
          if (!fileToModule.containsKey(fileName)) {
            break;
          }
          FileModule module = fileToModule.get(fileName);
          Node lhs = child.getFirstChild();
          Map<String, String> symbols = module.exportedNamespacesToSymbols;

          String exportedNamespace = nameUtil.findLongestNamePrefix(lhs, symbols.keySet());
          String exportedSymbol = null;

          if (exportedNamespace != null) {
            exportedSymbol = symbols.get(exportedNamespace);
          } else if (GentsNodeUtil.isObjLitWithJSIdentifierKeys(child.getSecondChild())) {
            // Special case the exports = {A, B, C} pattern. The rewritter code
            // already handles this pattern, but we need to pick a non-null symbol to
            // proceed.
            // TODO(radokirov): refactor this to not care about exportedSymbol when
            // export pattern is detected.
            exportedNamespace = exportedSymbol = "exports";
          }
          if (exportedNamespace != null) {
            convertExportAssignment(child, exportedNamespace, exportedSymbol, fileName);
            // Registers symbol for rewriting local uses
            registerLocalSymbol(
                child.getSourceFileName(), exportedNamespace, exportedNamespace, exportedSymbol);
          }
          break;
        default:
          break;
      }
    }

    private void collectMetdataForExports(Node namedNode, String fileName) {
      if (!fileToModule.containsKey(fileName)) {
        return;
      }

      String nodeName = namedNode.getFirstChild().getQualifiedName();
      if (nodeName == null) {
        return;
      }
      exportsToNodes.put(ExportedSymbol.of(fileName, nodeName, nodeName), namedNode);
    }
  }

  /** Converts goog.require statements into TypeScript import statements. */
  private class ModuleImportConverter extends AbstractTopLevelCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (NodeUtil.isNameDeclaration(n)) {
        Node node = n.getFirstFirstChild();

        // var x = goog.require(...);
        if (isARequireLikeCall(node)) {
          Node callNode = node;
          String requiredNamespace = callNode.getLastChild().getString();
          String localName = n.getFirstChild().getQualifiedName();
          ModuleImport moduleImport =
              new ModuleImport(
                  n,
                  Collections.singletonList(localName),
                  Collections.emptyMap(),
                  requiredNamespace,
                  false);
          if (moduleImport.validateImport()) {
            convertNonDestructuringRequireToImportStatements(n, moduleImport);
          }
          return;
        }

        // var {foo, bar} = goog.require(...);
        if (isADestructuringRequireCall(node)) {
          Node importedNode = node.getFirstChild();

          ArrayList<String> namedExports = new ArrayList<String>();
          Map<String, String> aliases = new HashMap<>();
          while (importedNode != null) {
            namedExports.add(importedNode.getString());
            if (!importedNode.isShorthandProperty()) {
              aliases.put(importedNode.getString(), importedNode.getFirstChild().getString());
            }
            importedNode = importedNode.getNext();
          }
          String requiredNamespace = node.getNext().getFirstChild().getNext().getString();
          ModuleImport moduleImport =
              new ModuleImport(n, namedExports, aliases, requiredNamespace, true);
          if (moduleImport.validateImport()) {
            convertDestructuringRequireToImportStatements(n, moduleImport);
          }
          return;
        }
      } else if (n.isExprResult()) {
        // goog.require(...);
        Node callNode = n.getFirstChild();
        if (isARequireLikeCall(callNode)) {
          String requiredNamespace = callNode.getLastChild().getString();
          // For goog.require(...) imports, the full local name is just the required
          // namespace/module.
          // We use the suffix from the namespace as the local name, i.e. for
          // goog.require("a.b"), requiredNamespace = "a.b", fullLocalName = ["a.b"], localName =
          // ["b"]
          ModuleImport moduleImport =
              new ModuleImport(
                  n,
                  Collections.singletonList(requiredNamespace),
                  Collections.emptyMap(),
                  requiredNamespace,
                  false);
          if (moduleImport.validateImport()) {
            convertNonDestructuringRequireToImportStatements(n, moduleImport);
          }
          return;
        }
      }
    }

    private boolean isADestructuringRequireCall(Node node) {
      return node != null
          && node.isObjectPattern()
          && node.getNext().hasChildren()
          && isARequireLikeCall(node.getNext());
    }

    private boolean isARequireLikeCall(Node node) {
      return node != null
          && node.isCall()
          && (node.getFirstChild().matchesQualifiedName("goog.require")
              || node.getFirstChild().matchesQualifiedName("goog.requireType")
              || node.getFirstChild().matchesQualifiedName("goog.forwardDeclare"));
    }
  }

  /** Rewrites variable names used in the file to correspond to the newly imported symbols. */
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
        // Don't rename patterns like `const rewriteCandidate = ...`
        if (importedNamespace != null && !isDeclaration(n)) {
          nameUtil.replacePrefixInName(n, importedNamespace, rewriteMap.get(importedNamespace));
          return false;
        }
      }
      return true;
    }

    private boolean isDeclaration(Node n) {
      Node parent = n.getParent();
      return parent.isConst() || parent.isLet() || parent.isVar();
    }
  }

  /** A single statement containing {@code goog.require(...)}. */
  private class ModuleImport {
    /** require statement Node. */
    private Node originalImportNode;

    /**
     * LHS of the requirement statement. If the require statement has no LHS, then local name is the
     * suffix of the required namespace/module.
     *
     * <p>A bit of a misnomer, because when there is an alias this points to the name in the
     * exporter not at the importer. See localNameAliases.
     */
    private List<String> localNames;

    /**
     * Full local name is used for rewriting imported variables in the file later on. There's a one
     * to one relationship between fullLocalNames and localNames.
     *
     * <p>In goog.modules fullLocalNames always match localNames. This is only useful for
     * goog.provide files. TODO(radokirov): drop support for
     */
    private List<String> fullLocalNames;

    /**
     * In goog.modules, one can import and alias a name.
     *
     * <p>let {A: B} = goog.require('ns.foo'};
     *
     * <p>In this case the localName is 'A', the localAlias is 'B'. (Confusingly the fullLocalName
     * is also 'A').
     *
     * <p>This maps from the imported name ('A' in the example above), to the local alias ('B' in
     * the example above).
     */
    private Map<String, String> localNameAliases;

    /**
     * For {@code goog.require(...)} with no LHS and no side effects, then we use the required
     * namespace/module's suffix as the local name. The backup name is useful in this case to avoid
     * conflicts when the required namespace/module's suffix is the same with a named exported from
     * the same file.
     */
    private String backupName;

    /** The required namespace or module name */
    private String requiredNamespace;

    /**
     * {@code true}, if the original require statement contains destructuring imports. For
     * destructuring imports, there are one or more local names and full local names. For non
     * destructuring imports, there is exactly one local name and one full local name.
     */
    private boolean isDestructuringImport;

    /** FileModule for the imported file */
    private FileModule module;

    /** Referenced file */
    private String referencedFile;

    /**
     * The last part of the required namespace and module, used to detect local name conflicts and
     * calculate the backup name
     */
    private String moduleSuffix;

    private ModuleImport(
        Node originalImportNode,
        List<String> fullLocalNames,
        Map<String, String> localNameAliases,
        String requiredNamespace,
        boolean isDestructuringImport) {
      this.originalImportNode = originalImportNode;
      this.fullLocalNames = fullLocalNames;
      this.requiredNamespace = requiredNamespace;
      this.isDestructuringImport = isDestructuringImport;
      this.module = namespaceToModule.get(requiredNamespace);
      if (this.module != null) {
        this.referencedFile =
            pathUtil.getImportPath(originalImportNode.getSourceFileName(), module.file);
      }
      this.moduleSuffix = nameUtil.lastStepOfName(requiredNamespace);
      this.backupName = this.moduleSuffix;
      this.localNames = new ArrayList<String>();
      for (String fullLocalName : fullLocalNames) {
        String localName = nameUtil.lastStepOfName(fullLocalName);
        this.localNames.add(localName);
        if (this.moduleSuffix.equals(localName)) {
          this.backupName = this.moduleSuffix + "Exports";
        }
      }
      this.localNameAliases = localNameAliases;
    }

    /** Validate the module import assumptions */
    private boolean validateImport() {
      if (!isDestructuringImport && fullLocalNames.size() != 1) {
        compiler.report(
            JSError.make(
                originalImportNode,
                GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                String.format(
                    "Non destructuring imports should have exactly one local name, got [%s]",
                    String.join(", ", fullLocalNames))));
        return false;
      }

      if (this.module == null && !isAlreadyConverted()) {
        compiler.report(
            JSError.make(
                originalImportNode,
                GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                String.format("Module %s does not exist.", requiredNamespace)));
        return false;
      }
      return true;
    }

    private static final String JS_BUILT_FROM_TS_FILE_SUFFIX = ".closure.js";

    /** Returns {@code true} if the imported file is already in TS */
    private boolean isAlreadyConverted() {
      // The simplest case is that the import is part of the files we are converting. However, we
      // can only say the import is already converted if it's in a "future TS" import name; e.g.
      // something like
      //    absolutePathPrefix.my.file.import,
      // which would correspond to
      //    absolutePathPrefix/my/file/import.ts
      // This form is necessary because when we generate the TS import path, we use the required
      // namespace, not the original source file.
      // Cases where the import file is being converted but its namespace does not match the future
      // TS import name are handled in `convertNonDestructuringRequireToImportStatements`.
      // TODO(ahafiz): see if we can reduce the number of special cases here.
      if (requiredNamespace.startsWith(absolutePathPrefix + ".")
          && filesToConvert.contains(module.file)) {
        return true;
      }
      // If the import comes from a built JS file that ends with ".closure.js", it was generated
      // from a TS source.
      if (module.file.contains(binDirectory + "/")
          && module.file.endsWith(JS_BUILT_FROM_TS_FILE_SUFFIX)) {
        return true;
      }
      if (module.file.contains(generatedDirectory + "/")) {
        // If import comes from a file G that shares a common prefix with a file F in the files we
        // are converting, G is probably generated by F. While G may not yet a TS source, it likely
        // will be after we convert F to TS, so let's treat it as such.
        for (String f : filesToConvert) {
          String generatedFilePrefix = pathUtil.getFilePathWithoutExtension(f) + "_";
          if (module.file.contains(generatedFilePrefix)) {
            return true;
          }
        }
      }
      return false;
    }

    /** Returns {@code true} if is full module import, for example const x = goog.require(...) */
    private boolean isFullModuleImport() {
      Node requireLHS = this.originalImportNode.getFirstChild();
      return requireLHS != null && requireLHS.isName();
    }
  }

  /**
   * Converts a non destructuring Closure goog.require call into a TypeScript import statement.
   *
   * <p>The resulting node is dependent on the exports by the module being imported:
   *
   * <pre>
   *   import localName from "goog:old.namespace.syntax";
   *   import {A as localName, B} from "./valueExports";
   *   import * as localName from "./objectExports";
   *   import "./sideEffectsOnly"
   * </pre>
   */
  private void convertNonDestructuringRequireToImportStatements(Node n, ModuleImport moduleImport) {
    // The imported file is already in TS
    if (moduleImport.isAlreadyConverted()) {
      convertRequireForAlreadyConverted(moduleImport);
      return;
    }

    // The imported file is kept in JS
    if (moduleImport.module.shouldUseOldSyntax()) {
      convertRequireToImportsIfImportedIsKeptInJs(moduleImport);
      return;
    }
    // For the rest of the function, the imported and importing files are migrating together

    // For non destructuring imports, there is exactly one local name and full local name
    String localName = moduleImport.localNames.get(0);
    String fullLocalName = moduleImport.fullLocalNames.get(0);
    // If not imported then this is a side effect only import.
    boolean imported = false;

    if (moduleImport.module.importedNamespacesToSymbols.containsKey(
        moduleImport.requiredNamespace)) {
      // import {value as localName} from "./file"
      Node importSpec = new Node(Token.IMPORT_SPEC, IR.name(moduleImport.moduleSuffix));
      importSpec.setShorthandProperty(true);
      // import {a as b} only when a != b
      if (!moduleImport.moduleSuffix.equals(localName)) {
        importSpec.addChildToBack(IR.name(localName));
      }

      Node importNode =
          new Node(
              Token.IMPORT,
              IR.empty(),
              new Node(Token.IMPORT_SPECS, importSpec),
              Node.newString(moduleImport.referencedFile));
      addImportNode(n, importNode);
      imported = true;

      registerLocalSymbol(
          n.getSourceFileName(), fullLocalName, moduleImport.requiredNamespace, localName);
      // Switch to back up name if necessary
      localName = moduleImport.backupName;
    }

    if (moduleImport.module.providesObjectChildren.get(moduleImport.requiredNamespace).size() > 0) {
      // import * as var from "./file"
      Node importNode =
          new Node(
              Token.IMPORT,
              IR.empty(),
              Node.newString(Token.IMPORT_STAR, localName),
              Node.newString(moduleImport.referencedFile));
      addImportNode(n, importNode);
      imported = true;

      for (String child :
          moduleImport.module.providesObjectChildren.get(moduleImport.requiredNamespace)) {
        if (!valueRewrite.contains(n.getSourceFileName(), child)) {
          String fileName = n.getSourceFileName();
          registerLocalSymbol(
              fileName,
              fullLocalName + '.' + child,
              moduleImport.requiredNamespace + '.' + child,
              localName + '.' + child);
        }
      }
    }

    if (!imported) {
      // Convert the require to "import './sideEffectOnly';"
      convertRequireForSideEffectOnlyImport(moduleImport);
    }

    compiler.reportChangeToEnclosingScope(n);
    n.detach();
  }

  /**
   * Converts a destructuring Closure goog.require call into a TypeScript import statement.
   *
   * <p>The resulting node is dependent on the exports by the module being imported:
   *
   * <pre>
   *   import {A as localName, B} from "./valueExports";
   * </pre>
   */
  private void convertDestructuringRequireToImportStatements(Node n, ModuleImport moduleImport) {
    // The imported file is already in TS
    if (moduleImport.isAlreadyConverted()) {
      convertRequireForAlreadyConverted(moduleImport);
      return;
    }

    // The imported file is kept in JS
    if (moduleImport.module.shouldUseOldSyntax()) {
      convertRequireToImportsIfImportedIsKeptInJs(moduleImport);
      return;
    }
    // For the rest of the function, the imported and importing files are migrating together

    // import {localName} from "./file"
    Node importSpecs = createNamedImports(moduleImport);
    Node importNode =
        new Node(
            Token.IMPORT, IR.empty(), importSpecs, Node.newString(moduleImport.referencedFile));
    addImportNode(n, importNode);

    for (int i = 0; i < moduleImport.fullLocalNames.size(); i++) {
      registerLocalSymbol(
          n.getSourceFileName(),
          moduleImport.fullLocalNames.get(i),
          moduleImport.requiredNamespace,
          moduleImport.localNames.get(i));
    }

    compiler.reportChangeToEnclosingScope(n);
    n.detach();
  }

  /** If the imported file is kept in JS, then use the special "goog:namespace" syntax */
  private void convertRequireToImportsIfImportedIsKeptInJs(ModuleImport moduleImport) {
    Node nodeToImport = null;
    // For destructuring imports use `import {foo} from 'goog:bar';`
    if (moduleImport.isDestructuringImport) {
      nodeToImport = new Node(Token.OBJECTLIT);
      for (String localName : moduleImport.localNames) {
        nodeToImport.addChildToBack(Node.newString(Token.STRING_KEY, localName));
      }
      // For non destructuring imports, it is safe to assume there's only one localName
    } else if (moduleImport.module.namespaceHasDefaultExport.getOrDefault(
        moduleImport.requiredNamespace, false)) {
      // If it has a default export then use `import foo from 'goog:bar';`
      nodeToImport = Node.newString(Token.NAME, moduleImport.localNames.get(0));
    } else {
      // If it doesn't have a default export then use `import * as foo from 'goog:bar';`
      nodeToImport = Node.newString(Token.IMPORT_STAR, moduleImport.localNames.get(0));
    }

    Node importNode =
        new Node(
            Token.IMPORT,
            IR.empty(),
            nodeToImport,
            Node.newString("goog:" + moduleImport.requiredNamespace));
    nodeComments.replaceWithComment(moduleImport.originalImportNode, importNode);
    compiler.reportChangeToEnclosingScope(importNode);

    for (int i = 0; i < moduleImport.fullLocalNames.size(); i++) {
      registerLocalSymbol(
          moduleImport.originalImportNode.getSourceFileName(),
          moduleImport.fullLocalNames.get(i),
          moduleImport.requiredNamespace,
          moduleImport.localNames.get(i));
    }
  }

  private void convertRequireForAlreadyConverted(ModuleImport moduleImport) {
    // we cannot use referencedFile here, because usually it points to the ES5 js file that is
    // the output of TS, and not the original source TS file.
    // However, we can reverse map the goog.module name to a file name.
    // NB: this only works when the namespace has the "future TS name". This should have already
    // been checked in isAlreadyConverted.
    // TODO(rado): sync this better with the mapping done in tsickle.
    String originalPath =
        moduleImport.requiredNamespace.replace(absolutePathPrefix + ".", "").replace('.', '/');
    String sourceFileName = moduleImport.originalImportNode.getSourceFileName();
    String referencedFile = pathUtil.getImportPath(sourceFileName, originalPath);
    // goog.require('...'); -> import '...';
    Node importSpec = IR.empty();
    if (moduleImport.isDestructuringImport) {
      importSpec = createNamedImports(moduleImport);
    } else if (moduleImport.isFullModuleImport()) {
      // It is safe to assume there's one full local name because this is validated before.
      String fullLocalName = moduleImport.fullLocalNames.get(0);
      importSpec = Node.newString(Token.IMPORT_STAR, fullLocalName);
    }
    Node importNode =
        new Node(Token.IMPORT, IR.empty(), importSpec, Node.newString(referencedFile));
    nodeComments.replaceWithComment(moduleImport.originalImportNode, importNode);
    compiler.reportChangeToEnclosingScope(importNode);
  }

  private static Node createNamedImports(ModuleImport moduleImport) {
    Node importSpec = new Node(Token.IMPORT_SPECS);
    importSpec.setShorthandProperty(true);
    for (String fullLocalName : moduleImport.fullLocalNames) {
      Node spec = new Node(Token.IMPORT_SPEC, IR.name(fullLocalName));
      spec.setShorthandProperty(true);
      if (moduleImport.localNameAliases.containsKey(fullLocalName)) {
        spec.addChildToBack(IR.name(moduleImport.localNameAliases.get(fullLocalName)));
      }
      importSpec.addChildToBack(spec);
    }
    return importSpec;
  }

  private void convertRequireForSideEffectOnlyImport(ModuleImport moduleImport) {
    Node importNode =
        new Node(Token.IMPORT, IR.empty(), IR.empty(), Node.newString(moduleImport.referencedFile));
    addImportNode(moduleImport.originalImportNode, importNode);
  }

  /**
   * Converts a Closure assignment on a goog.module or goog.provide namespace into a TypeScript
   * export statement. This method should only be called on a node within a module.
   *
   * @param assign Assignment node
   * @param exportedNamespace The prefix of the assignment name that we are exporting
   * @param exportedSymbol The symbol that we want to export from the file For example,
   *     convertExportAssignment(pre.fix = ..., "pre.fix", "name") <-> export const name = ...
   *     convertExportAssignment(pre.fix.foo = ..., "pre.fix", "name") <-> name.foo = ...
   */
  private void convertExportAssignment(
      Node assign, String exportedNamespace, String exportedSymbol, String fileName) {
    checkState(assign.isAssign());
    checkState(assign.getParent().isExprResult());
    Node grandParent = assign.getGrandparent();
    checkState(
        grandParent.isScript() || grandParent.isModuleBody(),
        "export assignment must be in top level script or module body");

    Node exprNode = assign.getParent();
    Node lhs = assign.getFirstChild();
    Node rhs = assign.getLastChild();
    JSDocInfo jsDoc = NodeUtil.getBestJSDocInfo(assign);

    if (lhs.matchesQualifiedName(exportedNamespace)) {
      rhs.detach();
      if (GentsNodeUtil.isObjLitWithJSIdentifierKeys(rhs)) {
        // The module metadata collector would have rewritten the export object literal to consist
        // of identifier->identifier KV pairs, so at this point we just need to handle two cases:
        //   1. export identifier is local identifier ({A} or {A: A})
        //   1. export identifier aliases local identifier ({A: B})
        List<Node> aliases = new ArrayList<>();
        for (Node child : rhs.children()) {
          if (!child.hasChildren() || child.getString().equals(child.getFirstChild().getString())) {
            // (1) We are in the simple case of exports = {..., A, ...} or exports = {..., A: A,
            // ...}.
            ExportedSymbol symbolToExport =
                ExportedSymbol.fromExportAssignment(
                    child.getFirstChild(), exportedNamespace, child.getString(), fileName);
            Node exportNode = exportsToNodes.get(symbolToExport);
            if (exportNode != null) {
              moveExportStmtToADeclKeyword(assign, exportNode);
            }
          } else {
            // (2) We are in the alias case of exports = {..., A: B, ...}.
            aliases.add(
                new Node(
                    Token.EXPORT_SPEC,
                    Node.newString(Token.NAME, child.getFirstChild().getString()),
                    Node.newString(Token.NAME, child.getString())));
          }
        }
        if (!aliases.isEmpty()) {
          Node exportSpecs = new Node(Token.EXPORT_SPECS);
          for (Node alias : aliases) {
            exportSpecs.addChildToBack(alias);
          }
          Node exportNode = new Node(Token.EXPORT, exportSpecs);
          exportNode.setJSDocInfo(jsDoc);
          nodeComments.replaceWithComment(exprNode, exportNode);
        } else {
          exprNode.detach();
        }
        return;
      }
      ExportedSymbol symbolToExport =
          ExportedSymbol.fromExportAssignment(rhs, exportedNamespace, exportedSymbol, fileName);
      if (rhs.isName() && exportsToNodes.containsKey(symbolToExport)) {
        moveExportStmtToADeclKeyword(assign, exportsToNodes.get(symbolToExport));
        exprNode.detach();
        return;
      }

      // Below the export node stays but is modified.
      Node exportSpecNode;
      if (rhs.isName() && exportedSymbol.equals(rhs.getString())) {
        // Rewrite the export line to: <code>export {rhs}</code>.
        exportSpecNode = createExportSpecs(rhs);
        exportSpecNode.useSourceInfoFrom(rhs);
      } else {
        // Rewrite the export line to: <code>export const exportedSymbol = rhs</code>.
        exportSpecNode = IR.constNode(IR.name(exportedSymbol), rhs);
        exportSpecNode.useSourceInfoFrom(rhs);
      }
      exportSpecNode.setJSDocInfo(jsDoc);
      Node exportNode = new Node(Token.EXPORT, exportSpecNode);
      nodeComments.replaceWithComment(exprNode, exportNode);

    } else {
      // Assume prefix has already been exported and just trim the prefix
      nameUtil.replacePrefixInName(lhs, exportedNamespace, exportedSymbol);
    }
  }

  /**
   * Takes an assignment statement (export or goog.provide one), removes it and instead finds the
   * matching declaration and adds an 'export' keyword.
   *
   * <p>Before: class C {} exports.C = C;
   *
   * <p>After: export class C {};
   */
  private void moveExportStmtToADeclKeyword(Node assignmentNode, Node declarationNode) {
    // Rewrite the AST to export the symbol directly using information from the export
    // assignment.
    Node next = declarationNode.getNext();
    Node parent = declarationNode.getParent();
    declarationNode.detach();

    Node export = new Node(Token.EXPORT, declarationNode);
    export.useSourceInfoFrom(assignmentNode);

    nodeComments.moveComment(declarationNode, export);
    astComments.moveComment(declarationNode, export);
    parent.addChildBefore(export, next);
    compiler.reportChangeToEnclosingScope(parent);
  }

  /** Creates an ExportSpecs node, which is the {...} part of an "export {name}" node. */
  private static Node createExportSpecs(Node name) {
    Node exportSpec = new Node(Token.EXPORT_SPEC, name);
    // Set the "is shorthand" property so that we "export {x}", not "export {x as x}".
    exportSpec.setShorthandProperty(true);
    return new Node(Token.EXPORT_SPECS, exportSpec);
  }

  /** Saves the local name for imported symbols to be used for code rewriting later. */
  void registerLocalSymbol(
      String sourceFile, String fullLocalName, String requiredNamespace, String localName) {
    valueRewrite.put(sourceFile, fullLocalName, localName);
    typeRewrite.put(sourceFile, fullLocalName, localName);
    typeRewrite.put(sourceFile, requiredNamespace, localName);
  }

  private void addImportNode(Node n, Node importNode) {
    importNode.useSourceInfoFromForTree(n);
    n.getParent().addChildBefore(importNode, n);
    nodeComments.moveComment(n, importNode);
  }

  /** Metadata about an exported symbol. */
  private static final class ExportedSymbol {
    /** The name of the file exporting the symbol. */
    final String fileName;

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

    private ExportedSymbol(String fileName, String localName, String exportedName) {
      this.fileName = checkNotNull(fileName);
      this.localName = checkNotNull(localName);
      this.exportedName = checkNotNull(exportedName);
    }

    static ExportedSymbol of(String fileName, String localName, String exportedName) {
      return new ExportedSymbol(fileName, localName, exportedName);
    }

    static ExportedSymbol fromExportAssignment(
        Node rhs, String exportedNamespace, String exportedSymbol, String fileName) {
      String localName = (rhs.getQualifiedName() != null) ? rhs.getQualifiedName() : exportedSymbol;

      String exportedName;
      if (exportedNamespace.equals(EXPORTS)) { // is a default export
        exportedName = localName;
      } else if (exportedNamespace.startsWith(EXPORTS)) { // is a named export
        exportedName =
            exportedNamespace.substring(EXPORTS.length() + 1, exportedNamespace.length());
      } else { // exported via goog.provide
        exportedName = exportedSymbol;
      }

      return new ExportedSymbol(fileName, localName, exportedName);
    }

    @Override
    public String toString() {
      return MoreObjects.toStringHelper(getClass())
          .add("fileName", fileName)
          .add("localName", localName)
          .add("exportedName", exportedName)
          .toString();
    }

    @Override
    public int hashCode() {
      return Objects.hash(this.fileName, this.localName, this.exportedName);
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
      return Objects.equals(this.fileName, that.fileName)
          && Objects.equals(this.localName, that.localName)
          && Objects.equals(this.exportedName, that.exportedName);
    }
  }
}
