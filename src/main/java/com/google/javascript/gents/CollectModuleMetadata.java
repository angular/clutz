package com.google.javascript.gents;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.Node;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Preprocesses all source and library files to build a mapping between Closure namespaces and
 * file based modules.
 */
public final class CollectModuleMetadata extends AbstractTopLevelCallback implements CompilerPass {

  private final AbstractCompiler compiler;
  final Map<String, FileModule> fileToModule = new HashMap<>();
  final Map<String, FileModule> namespaceToModule = new HashMap<>();

  Map<String, FileModule> getFileMap() {
    return fileToModule;
  }

  Map<String, FileModule> getNamespaceMap() {
    return namespaceToModule;
  }

  public CollectModuleMetadata(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    if (!n.isExprResult()) {
      return;
    }

    Node child = n.getFirstChild();
    String filename = n.getSourceFileName();
    switch (child.getType()) {
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
              compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                  "goog.module must be the first top level statement."));
              break;
            }
            registerGoogModule(child, filename, child.getLastChild().getString());
            break;
          case "goog.provide":
            registerProvidesModule(child, filename, child.getLastChild().getString());
            break;
          default:
            break;
        }
        break;
      case ASSIGN:
        if (!fileToModule.containsKey(filename)) {
          break;
        }
        FileModule module = fileToModule.get(filename);
        module.maybeAddExport(child.getFirstChild());
        break;
      default:
        break;
    }
  }

  /** Registers a goog.module namespace for future lookup. */
  void registerGoogModule(Node n, String file, String namespace) {
    if (fileToModule.containsKey(file)) {
      compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
          String.format("goog.module files cannot contain other goog.module or goog.provides.")));
      return;
    }
    FileModule module = new FileModule(file, true);
    module.providesObjectChildren.put(namespace, new HashSet<String>());
    fileToModule.put(file, module);
    namespaceToModule.put(namespace, module);
  }

  /** Registers a goog.provide namespace for future lookup. */
  void registerProvidesModule(Node n, String file, String namespace) {
    if (fileToModule.containsKey(file)) {
      if (fileToModule.get(file).isGoogModule) {
        compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
            String.format("goog.provide cannot be used in the same file as goog.module.")));
        return;
      }
    } else {
      fileToModule.put(file, new FileModule(file, false));
    }
    FileModule module = fileToModule.get(file);
    module.providesObjectChildren.put(namespace, new HashSet<String>());
    namespaceToModule.put(namespace, module);
  }

  /** Returns the last identifier of a qualified name string. */
  String lastStepOfPropertyPath(String name) {
    return lastStepOfPropertyPath(NodeUtil.newQName(compiler, name));
  }

  /** Returns the last identifier of a name node. */
  String lastStepOfPropertyPath(Node n) {
    return n.isGetProp() ? n.getLastChild().getString() : n.getQualifiedName();
  }

  /**
   * Encapsulates the module provided by each file.
   */
  class FileModule {
    final String file;
    private final boolean isGoogModule;
    // Map from provided namespace to the set of subproperties that are exported
    final Map<String, Set<String>> providesObjectChildren = new HashMap<>();
    // Map from exported exported to the exported identifier
    final Map<String, String> exportedSymbols = new HashMap<>();
    // Map from the imported namespace to the imported identifier
    final Map<String, String> importedSymbols = new HashMap<>();

    FileModule(String file, boolean isGoogModule) {
      this.file = file;
      this.isGoogModule = isGoogModule;
    }

    /** Returns if the file actually exports any symbols. */
    boolean hasExports() {
      return !exportedSymbols.isEmpty();
    }

    /**
     * Attempts to export the name exportsName.
     * Does nothing if exportsName is an invalid export.
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
      if ("exports".equals(exportsName.getQualifiedName())) {
        addExport(exportsName.getQualifiedName(), fullname, lastStepOfPropertyPath(fullname));
      } else if (exportsName.isGetProp() &&
          "exports".equals(exportsName.getFirstChild().getQualifiedName())) {
        String identifier = exportsName.getLastChild().getString();
        addExport(exportsName.getQualifiedName(), fullname + "." + identifier, identifier);
      }
    }

    private void maybeAddProvidesExport(Node exportsName) {
      String fullname = exportsName.getQualifiedName();
      if (providesObjectChildren.containsKey(fullname) || (exportsName.isGetProp() &&
          providesObjectChildren.containsKey(exportsName.getFirstChild().getQualifiedName()))) {
        addExport(fullname, fullname, lastStepOfPropertyPath(exportsName));
      }
    }

    private void addExport(String exportName, String importName, String identifier) {
      exportedSymbols.put(exportName, identifier);
      importedSymbols.put(importName, identifier);

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
