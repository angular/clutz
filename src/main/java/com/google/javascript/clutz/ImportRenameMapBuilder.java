package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * If Clutz is running in incremental mode, closure can't resolve imported symbols, so it gives them
 * names based on the symbol that the import was assigned to (either
 * `module$contents$current$file_symbol` or just `symbol`) instead of names that reference the
 * original namespace (ie `module$exports$imported$file`). ImportRenameMapBuilder builds a map from
 * the local name to the exported name so the original names can be substituted.
 */
public class ImportRenameMapBuilder {

  /**
   * Build takes a collection of parsed inputs and walks the ast to find any imports into local
   * variables to build a map from the name closure generates in incremental mode to the exported
   * name of the import.
   */
  public static Map<String, String> build(
      Collection<Node> parsedInputs, Set<String> knownGoogProvides) {
    Map<String, String> importRenameMap = new HashMap<>();
    for (Node ast : parsedInputs) {
      // Symbols can be imported into a variable in a goog.module() file, so look for imports in the
      // body of the goog module.
      String moduleId = getGoogModuleId(ast);
      if (moduleId != null) {
        importRenameMap.putAll(build(moduleId, ast.getFirstChild(), knownGoogProvides));
      }

      // Or symbols can be imported into a variable in a top-level goog.scope() block, so look for
      // imports in the bodies of any goog scopes.
      List<Node> googScopes = getTopLevelGoogScopes(ast);
      if (!googScopes.isEmpty()) {
        for (Node googScope : googScopes) {
          importRenameMap.putAll(build(null, googScope, knownGoogProvides));
        }
      }
    }
    return importRenameMap;
  }

  private static List<Node> getTopLevelGoogScopes(Node astRoot) {
    List<Node> googScopes = new ArrayList<>();
    for (Node statement : astRoot.children()) {
      if (isGoogScopeCall(statement)) {
        googScopes.add(statement.getFirstChild().getChildAtIndex(1).getChildAtIndex(2));
      }
    }
    return googScopes;
  }

  private static boolean isGoogScopeCall(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    Node expression = statement.getFirstChild();
    return expression.isCall() && expression.getFirstChild().matchesQualifiedName("goog.scope");
  }

  private static boolean isGoogModuleCall(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    Node expression = statement.getFirstChild();
    return expression.isCall() && expression.getFirstChild().matchesQualifiedName("goog.module");
  }

  /**
   * Matches either `const foo = goog.require()` or `const foo = goog.module.get()` depending on if
   * statement is in a goog.module or a goog.scope.
   */
  private static boolean isImportAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    Node rightHandSide = statement.getFirstFirstChild();

    return rightHandSide != null
        && rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get"));
  }

  /** Matches destructing from a variable ie `const {foo, bar: baz} = quux;` */
  private static boolean isVariableDestructuringAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    if (!statement.getFirstChild().isDestructuringLhs()) {
      return false;
    }

    Node destructuringAssignment = statement.getFirstChild();

    Node rightHandSide = destructuringAssignment.getChildAtIndex(1);

    return rightHandSide.isName();
  }

  /**
   * Matches either `const {foo} = goog.require()` or `const {foo} = goog.module.get()` depending on
   * if statement is in a goog.module or a goog.scope.
   */
  private static boolean isImportDestructuringAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    if (!statement.getFirstChild().isDestructuringLhs()) {
      return false;
    }

    Node destructuringAssignment = statement.getFirstChild();

    Node rightHandSide = destructuringAssignment.getChildAtIndex(1);

    return rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get"));
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
   * Build does the actual work of walking over the AST, finding any goog.require() or
   * goog.module.get() assignments or destructuring assignments, parsing them, and generating the
   * mappings from local symbol names to exported symbol names. If the imported module's id is in
   * knownGoogProvides, emit a rename in goog.provide style, otherwise, use goog.module style.
   */
  private static Map<String, String> build(
      String localModuleId, Node moduleBody, Set<String> knownGoogProvides) {
    Map<String, String> importRenameMap = new HashMap<>();

    for (Node statement : moduleBody.children()) {
      if (isImportAssignment(statement)) {
        // `const C = goog.require()` or
        // `const C = goog.module.get()`
        String importedModuleId = statement.getFirstFirstChild().getChildAtIndex(1).getString();
        String variableName = statement.getFirstChild().getString();

        String exportedSymbolName;
        if (!knownGoogProvides.contains(importedModuleId)) {
          exportedSymbolName = buildWholeModuleExportSymbolName(importedModuleId);
        } else {
          exportedSymbolName = importedModuleId;
        }
        importRenameMap.put(variableName, exportedSymbolName);
        // If we're in a goog scope, there isn't a module id
        if (localModuleId != null) {
          String localSymbolName = buildLocalSymbolName(localModuleId, variableName);
          importRenameMap.put(localSymbolName, exportedSymbolName);
        }
      } else if (isImportDestructuringAssignment(statement)) {
        // `const {C, Clazz: RenamedClazz} = goog.require()` or
        // `const {C, Clazz: RenamedClazz} = goog.module.get()`
        String importedModuleId =
            statement.getFirstChild().getChildAtIndex(1).getChildAtIndex(1).getString();
        for (Node destructured : statement.getFirstFirstChild().children()) {
          String originalName = destructured.getString();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String variableName;
          if (destructured.getFirstChild() != null) {
            // Renaming
            variableName = destructured.getFirstChild().getString();
          } else {
            // No rename
            variableName = originalName;
          }

          String exportedSymbolName;
          if (!knownGoogProvides.contains(importedModuleId)) {
            exportedSymbolName = buildNamedExportSymbolName(importedModuleId, originalName);
          } else {
            exportedSymbolName = importedModuleId + "." + originalName;
          }
          importRenameMap.put(variableName, exportedSymbolName);
          // If there's a local module id, a goog.module is being processed, so there needs to be a
          // rename for `module$contents$local$module$id_foo`
          if (localModuleId != null) {
            String localSymbolName = buildLocalSymbolName(localModuleId, variableName);
            importRenameMap.put(localSymbolName, exportedSymbolName);
          }
        }
      } else if (isVariableDestructuringAssignment(statement)) {
        // `const B = goog.require()`
        // `const {C, Clazz: RenamedClazz} = B`
        // On separate lines
        String destructuredVariable = statement.getFirstChild().getChildAtIndex(1).getString();

        for (Node destructured : statement.getFirstFirstChild().children()) {
          String originalName = destructured.getString();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String variableName;
          if (destructured.getFirstChild() != null) {
            // Renaming
            variableName = destructured.getFirstChild().getString();
          } else {
            // No rename
            variableName = originalName;
          }

          // The statements are iterated in order, so the statement with the goog.require() is already
          // processed, so the value is already in the import rename map.
          String exportedSymbolName =
              importRenameMap.get(destructuredVariable) + "." + originalName;

          importRenameMap.put(variableName, exportedSymbolName);
          // If there's a local module id, a goog.module is being processed, so there needs to be a
          // rename for `module$contents$local$module$id_foo`
          if (localModuleId != null) {
            String localSymbolName = buildLocalSymbolName(localModuleId, variableName);
            importRenameMap.put(localSymbolName, exportedSymbolName);
          }
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
