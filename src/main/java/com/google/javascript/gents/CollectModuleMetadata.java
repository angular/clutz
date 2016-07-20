package com.google.javascript.gents;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.rhino.Node;

import java.util.HashMap;
import java.util.Map;

/**
 * Preprocesses all source and library files to build a mapping between Closure namespaces and
 * file based modules.
 */
public final class CollectModuleMetadata extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  private final Map<String, FileModule> fileToModule;
  private final Map<String, FileModule> namespaceToModule;

  Map<String, FileModule> getFileMap() {
    return fileToModule;
  }
  Map<String, FileModule> getNamespaceMap() {
    return namespaceToModule;
  }

  public CollectModuleMetadata(AbstractCompiler compiler) {
    this.compiler = compiler;
    this.fileToModule = new HashMap<>();
    this.namespaceToModule = new HashMap<>();
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
            compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                "goog.module must be the first top level statement."));
            break;
          }

          registerModule(n.getSourceFileName(), n.getLastChild().getString());
        }
        break;
      case ASSIGN:
        // Only convert inside goog.module files
        if (fileToModule.containsKey(n.getSourceFileName()) &&
            "exports".equals(firstStepOfPropertyPath(n.getFirstChild()))) {
          if (!parent.getParent().isScript()) { // is top level
            compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                "goog.module exports must be top level."));
            break;
          }

          // Check what type of export this is
          FileModule module = fileToModule.get(n.getSourceFileName());
          Node lhs = n.getFirstChild();
          if (lhs.isName()) {
            module.exportsDefault = true;
          } else if (lhs.isGetProp() && lhs.getFirstChild().isName()) {
            module.exportsNamespace = true;
          }

          // Disallow both default and namespace exports for now
          // TODO(renez): change this once we have goog.provide
          if (module.exportsDefault && module.exportsNamespace) {
            compiler.report(JSError.make(n, GentsErrorManager.GENTS_MODULE_PASS_ERROR,
                String.format("Exporting both default and namespace values unsupported.")));
          }
        }
        break;
      default:
        break;
    }
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
  public static class FileModule {
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
