package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * If Clutz is running in incremental mode, closure can't resolve imported symbols, so it gives them
 * names in the current namespace (ie `module$contents$current$file`), instead of names that
 * reference the original namespace (ie `module$exports$imported$file`). ImportRenameMapBuilder
 * builds a map from the local name to the exported name so the original names can be substituted.
 */
public class ImportRenameMapBuilder {

  /**
   * Build takes a collection of source files, parses them with the compiler, and walks the ast to
   * find any `const variable = goog.require()` statements to build a map from the name closure
   * generates in incremental mode to the exported name of the import.
   */
  public static Map<String, String> build(Collection<Node> parsedInputs) {
    Map<String, String> importRenameMap = new HashMap<>();
    for (Node ast : parsedInputs) {
      String moduleId = getGoogModuleId(ast);
      // Closure can only put the symbol name into the current module's namespace, if the source
      // file is a module, so if it isn't a module, just bail
      if (moduleId != null) {
        importRenameMap.putAll(build(moduleId, ast));
      }
    }
    return importRenameMap;
  }

  private static boolean isGoogModuleCall(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    Node expression = statement.getFirstChild();
    return expression.isCall() && expression.getFirstChild().matchesQualifiedName("goog.module");
  }

  private static boolean isGoogRequireAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    Node rightHandSide = statement.getFirstFirstChild();

    return rightHandSide != null
        && rightHandSide.isCall()
        && rightHandSide.getFirstChild().matchesQualifiedName("goog.require");
  }

  private static boolean isGoogRequireDestructuringAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    if (!statement.getFirstChild().isDestructuringLhs()) {
      return false;
    }

    Node destructuringAssignment = statement.getFirstChild();

    Node rightHandSide = destructuringAssignment.getChildAtIndex(1);

    return rightHandSide.isCall()
        && rightHandSide.getFirstChild().matchesQualifiedName("goog.require");
  }

  private static String getGoogModuleId(Node astRoot) {
    if (astRoot.getFirstChild() == null || !astRoot.getFirstChild().isModuleBody()) {
      return null;
    }

    Node moduleBody = astRoot.getFirstChild();
    for (Node statement : moduleBody.children()) {
      if (isGoogModuleCall(statement)) {
        return statement.getFirstChild().getChildAtIndex(1).getString();
      }
    }
    return null;
  }

  /**
   * Build does the actual work of walking over the AST, finding any goog.require() assignments or
   * destructuring assignments, parsing them, and generating the mappings from local symbol names to
   * exported symbol names.
   */
  private static Map<String, String> build(String localModuleId, Node astRoot) {
    Map<String, String> importRenameMap = new HashMap<>();
    if (astRoot.getFirstChild() == null || !astRoot.getFirstChild().isModuleBody()) {
      return importRenameMap;
    }

    Node moduleBody = astRoot.getFirstChild();
    for (Node statement : moduleBody.children()) {
      if (isGoogRequireAssignment(statement)) {
        // `const C = goog.require()`
        String importedModuleId = statement.getFirstFirstChild().getChildAtIndex(1).getString();
        String variableName = statement.getFirstChild().getString();

        String localSymbolName = buildLocalSymbolName(localModuleId, variableName);
        String exportedSymbolName = buildWholeModuleExportSymbolName(importedModuleId);
        importRenameMap.put(localSymbolName, exportedSymbolName);
        importRenameMap.put(variableName, exportedSymbolName);
      } else if (isGoogRequireDestructuringAssignment(statement)) {
        // `const {C, Clazz: RenamedClazz} = goog.require()`
        String importedModuleId =
            statement.getFirstChild().getChildAtIndex(1).getChildAtIndex(1).getString();
        for (Node destructured : statement.getFirstFirstChild().children()) {
          String originalName = destructured.getString();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String variableName;
          if (destructured.getFirstChild() != null) {
            variableName = destructured.getFirstChild().getString();
          } else {
            variableName = originalName;
          }

          String localSymbolName = buildLocalSymbolName(localModuleId, variableName);
          String exportedSymbolName = buildNamedExportSymbolName(importedModuleId, originalName);
          importRenameMap.put(localSymbolName, exportedSymbolName);
          importRenameMap.put(variableName, exportedSymbolName);
        }
      }
    }

    return importRenameMap;
  }

  /**
   * The exported symbol can take 2 forms - one where it refers to everything that the module
   * exports and another where it refers to just one thing the module exports. If the original
   * module used the `exports = ...` style, the symbol name is just the module name.
   *
   * <p>TODO(lucassloan): this only holds for importing from a goog.module see:
   * https://github.com/angular/clutz/issues/596
   */
  private static String buildWholeModuleExportSymbolName(String importedModuleId) {
    return "module$exports$" + importedModuleId.replace(".", "$");
  }

  /**
   * The exported symbol can take 2 forms - one where it refers to everything that the module
   * exports and another where it refers to just one thing the module exports. If the original
   * module used the `exports.foo = ...` style, the symbol name is the module name plus the
   * individual export's name.
   *
   * <p>TODO(lucassloan): this only holds for importing from a goog.module see:
   * https://github.com/angular/clutz/issues/596
   */
  private static String buildNamedExportSymbolName(String importedModuleId, String originalName) {
    return "module$exports$" + importedModuleId.replace(".", "$") + "." + originalName;
  }

  private static String buildLocalSymbolName(String importingModuleId, String variableName) {
    return "module$contents$" + importingModuleId.replace(".", "$") + "_" + variableName;
  }
}
