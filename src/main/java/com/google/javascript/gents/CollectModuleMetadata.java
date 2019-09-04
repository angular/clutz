package com.google.javascript.gents;

import static com.google.common.base.MoreObjects.firstNonNull;

import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Iterables;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import javax.annotation.Nullable;

/**
 * Preprocesses all source and library files to build a mapping between Closure namespaces and file
 * based modules.
 */
public final class CollectModuleMetadata extends AbstractTopLevelCallback implements CompilerPass {

  private final AbstractCompiler compiler;
  private final NameUtil nameUtil;

  private final Set<String> filesToConvert;
  private final Map<String, FileModule> fileToModule = new LinkedHashMap<>();
  private final Map<String, FileModule> namespaceToModule = new LinkedHashMap<>();

  Map<String, FileModule> getFileMap() {
    return fileToModule;
  }

  void addFileMap(String filename) {
    if (!fileToModule.containsKey(filename)) {
      fileToModule.put(filename, new FileModule(filename, false));
    }
  }

  Map<String, FileModule> getNamespaceMap() {
    return namespaceToModule;
  }

  /** Returns a map from all symbols in the compilation unit to their respective modules */
  Map<String, FileModule> getSymbolMap() {
    Map<String, FileModule> out = new LinkedHashMap<>();
    for (FileModule module : fileToModule.values()) {
      for (String symbol : module.importedNamespacesToSymbols.keySet()) {
        out.put(symbol, module);
      }
    }
    return out;
  }

  CollectModuleMetadata(
      AbstractCompiler compiler, NameUtil nameUtil, Set<String> filesToConvert) {
    this.compiler = compiler;
    this.nameUtil = nameUtil;
    this.filesToConvert = filesToConvert;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    String filename = n.getSourceFileName();
    @Nullable FileModule module = fileToModule.get(filename);

    // const A = goog.require('path.to.A');
    if (module != null && (n.isConst() || n.isLet() || n.isVar())) {
      @Nullable Node rhs = n.getFirstChild().getLastChild();
      if (rhs != null && rhs.isCall() && rhs.getFirstChild().matchesQualifiedName("goog.require")) {
        module.reportImport();
      }
    }

    if (!n.isExprResult()) {
      return;
    }

    Node child = n.getFirstChild();
    switch (child.getToken()) {
      case CALL:
        // Ignore unusual call cases
        // (function() {...})()
        // nested().calls()
        if (child.getFirstChild().getQualifiedName() == null) {
          break;
        }
        switch (child.getFirstChild().getQualifiedName()) {
          case "goog.module":
            if (!parent.getFirstChild().equals(n)) { // is first statement
              compiler.report(
                  JSError.make(
                      n,
                      GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                      "goog.module must be the first top level statement."));
              break;
            }
            registerGoogModule(child, filename, child.getLastChild().getString());
            break;
          case "goog.provide":
            registerProvidesModule(child, filename, child.getLastChild().getString());
            break;
          case "goog.require":
            if (module != null) {
              module.reportImport();
            }
            break;
          default:
            break;
        }
        break;
      case GETPROP:
        // Typedefs are often just on property gets, not on assignments.
        JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(n);
        if (jsdoc != null && jsdoc.containsTypeDefinition() && module != null) {
          module.maybeAddExport(child);
        }
        break;
      case ASSIGN:
        if (module == null) {
          break;
        }
        Node maybeExportNode = child.getFirstChild();
        if (maybeExportNode != null) {
          String maybeExportString = maybeExportNode.getQualifiedName();
          if (maybeExportString != null
              && (maybeExportString.equals("exports")
                  || module.jsNamespaces.contains(maybeExportString))) {
            if (module.isGoogModule) {
              module.namespaceHasDefaultExport.put(
                  Iterables.getOnlyElement(module.jsNamespaces), true);
            } else {
              module.namespaceHasDefaultExport.put(maybeExportString, true);
            }
          }
        }
        module.maybeAddExport(maybeExportNode);
        break;
      default:
        break;
    }
  }

  /** Registers a goog.module namespace for future lookup. */
  private void registerGoogModule(Node n, String file, String namespace) {
    if (fileToModule.containsKey(file)) {
      compiler.report(
          JSError.make(
              n,
              GentsErrorManager.GENTS_MODULE_PASS_ERROR,
              String.format(
                  "goog.module files cannot contain other goog.module or goog.provides.")));
      return;
    }
    FileModule module = new FileModule(file, true);
    module.jsNamespaces.add(namespace);
    module.registerNamespaceToGlobalScope(namespace);
  }

  /** Registers a goog.provide namespace for future lookup. */
  void registerProvidesModule(Node n, String file, String namespace) {
    FileModule module;
    if (fileToModule.containsKey(file)) {
      if (fileToModule.get(file).isGoogModule) {
        compiler.report(
            JSError.make(
                n,
                GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                String.format("goog.provide cannot be used in the same file as goog.module.")));
        return;
      }
      module = fileToModule.get(file);
    } else {
      module = new FileModule(file, false);
    }
    module.jsNamespaces.add(namespace);
    module.registerNamespaceToGlobalScope(namespace);
  }

  /** Encapsulates the module provided by each file. */
  class FileModule {
    final String file;

    /** Module is not part of the conversion process and only exists for its exported symbols */
    private final boolean isJsLibrary;
    /** Declared with goog.module rather than goog.provide */
    private final boolean isGoogModule;

    /** {@code True}, if the module has any imports (e.g.{@code goog.require}). */
    private boolean hasImports = false;

    /** namespace of the module in the original closure javascript. */
    private Set<String> jsNamespaces = new HashSet<>();
    /**
     * true if the goog.provide namespace/goog.module module's clutz generated .d.ts will have a
     * default export.
     */
    Map<String, Boolean> namespaceHasDefaultExport = new HashMap<>();

    /**
     * Map from each provided namespace to all exported subproperties. Note that only namespaces
     * declared with 'goog.module' or 'goog.provide' are considered provided. Their subproperties
     * are considered exported from the file, but not directly provided. This is to determine what
     * namespaces other files are allowed to reference with 'goog.require'.
     *
     * <p>For example,
     *
     * <pre>
     *   goog.module('A.B');
     *   exports = ...;
     *   exports.C = ...;
     *   exports.C.D = ...;
     * </pre>
     *
     * Would result in providesObjectChildren['A.B'] = {'C'}
     */
    final Map<String, Set<String>> providesObjectChildren = new LinkedHashMap<>();

    /** Map of the goog.provided namespace to the node assigned to it. */
    private final Map<String, Node> googProvideNamespaceToNode = new LinkedHashMap<>();

    /**
     * Map from the fully qualified name being exported to the exported symbol. For example,
     *
     * <pre>
     *   goog.module('A.B');
     *   exports = ...;
     *   exports.C = ...;
     *   exports.C.D = ...;
     * </pre>
     *
     * Would result in:
     *
     * <pre>
     *    exportedNamespacesToSymbols['exports'] = 'B'
     *    exportedNamespacesToSymbols['exports.C'] = 'C'
     *  </pre>
     */
    final Map<String, String> exportedNamespacesToSymbols = new LinkedHashMap<>();

    /**
     * Map from the fully qualified name that would be imported to the exported symbol. For example,
     *
     * <pre>
     *   goog.module('A.B');
     *   exports = ...;
     *   exports.C = ...;
     *   exports.C.D = ...;
     * </pre>
     *
     * Would result in:
     *
     * <pre>
     *    importedNamespacesToSymbols['A.B'] = 'B'
     *    importedNamespacesToSymbols['A.B.C'] = 'C'
     *  </pre>
     */
    final Map<String, String> importedNamespacesToSymbols = new LinkedHashMap<>();

    FileModule(String file, boolean isGoogModule) {
      this.file = file;
      this.isGoogModule = isGoogModule;
      this.isJsLibrary = !filesToConvert.contains(file);
    }

    /** Returns if the import statement for this file should use the old 'goog:' namespace syntax */
    boolean shouldUseOldSyntax() {
      return isJsLibrary;
    }

    /** Returns if the file actually exports any symbols. */
    boolean hasExports() {
      return !exportedNamespacesToSymbols.isEmpty();
    }

    /** Records that the module has at least one import. */
    void reportImport() {
      this.hasImports = true;
    }

    /** Returns {@code true} if the module has at least one import. */
    boolean hasImports() {
      return this.hasImports;
    }

    /**
     * Register namespace name to global scope so that other files can call 'goog.require' on the
     * qualified name.
     */
    void registerNamespaceToGlobalScope(String namespace) {
      providesObjectChildren.put(namespace, new LinkedHashSet<String>());
      if (isJsLibrary) {
        maybeAddExport(NodeUtil.newQName(compiler, namespace));
      }
      fileToModule.put(file, this);
      namespaceToModule.put(namespace, this);
    }

    /**
     * Attempts to export the name exportsName. Does nothing if exportsName is an invalid export.
     */
    void maybeAddExport(Node exportsName) {
      if (isGoogModule) {
        maybeAddGoogExport(exportsName);
      } else {
        maybeAddProvidesExport(exportsName);
      }
    }

    private void maybeAddGoogExport(Node exportsName) {
      String fullname = providesObjectChildren.keySet().iterator().next();
      if (exportsName.matchesName("exports")) {
        String identifier =
            firstNonNull(
                exportsName.getNext().getQualifiedName(), nameUtil.lastStepOfName(fullname));
        addExport(exportsName.getQualifiedName(), fullname, identifier);
      } else if (exportsName.isGetProp() && exportsName.getFirstChild().matchesName("exports")) {
        String identifier = exportsName.getLastChild().getString();
        String importName = fullname + "." + identifier;
        addExport(exportsName.getQualifiedName(), importName, identifier);

        // Register the named export to the module namespace.
        if (!namespaceToModule.containsKey(importName)) {
          namespaceToModule.put(importName, this);
          providesObjectChildren.put(importName, ImmutableSet.<String>of());
        }
      }
    }

    private void maybeAddProvidesExport(Node exportsName) {
      String fullname = exportsName.getQualifiedName();

      if (providesObjectChildren.containsKey(fullname)) {
        googProvideNamespaceToNode.put(fullname, exportsName);
        addExport(fullname, fullname, nameUtil.lastStepOfName(exportsName));

      } else if (exportsName.isGetProp()
          && providesObjectChildren.containsKey(exportsName.getFirstChild().getQualifiedName())) {
        googProvideNamespaceToNode.put(fullname, exportsName);

        // functions declared on functions should be exported.
        // static functions on classes should not be exported.
        String parentName = exportsName.getFirstChild().getQualifiedName();
        @Nullable Node parentNode = googProvideNamespaceToNode.get(parentName);
        JSDocInfo jsDoc = parentNode != null ? NodeUtil.getBestJSDocInfo(parentNode) : null;

        if (providesObjectChildren.containsKey(parentName)
            && (jsDoc == null || !jsDoc.isConstructor())) {
          addExport(fullname, fullname, nameUtil.lastStepOfName(exportsName));
        }
      }
    }

    private void addExport(String exportName, String importName, String identifier) {
      exportedNamespacesToSymbols.put(exportName, identifier);
      importedNamespacesToSymbols.put(importName, identifier);

      Node namespace = NodeUtil.newQName(compiler, importName);
      if (namespace.isGetProp()) {
        String parentName = namespace.getFirstChild().getQualifiedName();
        if (providesObjectChildren.containsKey(parentName)) {
          providesObjectChildren.get(parentName).add(identifier);
        }
      }
    }
  }
}
