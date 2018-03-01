package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * If Clutz is running in incremental mode, closure can't resolve imported symbols, so it gives them
 * names based on the symbol that the import was assigned to (either
 * `module$contents$current$file_symbol` or just `symbol`) instead of names that reference the
 * original namespace (ie `module$exports$imported$file`). ImportRenameMapBuilder builds a map from
 * the local name to the exported name so the original names can be substituted.
 */
public class ImportRenameMapBuilder extends ImportBasedMapBuilder {

  /**
   * Build does the actual work of walking over the AST, finding any goog.require() or
   * goog.module.get() assignments or destructuring assignments, parsing them, and generating the
   * mappings from local symbol names to exported symbol names. If the imported module's id is in
   * googProvides, emit a rename in goog.provide style, otherwise, use goog.module style.
   */
  protected Map<String, String> build(
      String localModuleId, Node moduleBody, Set<String> googProvides) {
    Map<String, String> importRenameMap = new HashMap<>();

    for (Node statement : moduleBody.children()) {
      if (isImportAssignment(statement)) {
        // `const C = goog.require()` or
        // `const C = goog.module.get()`
        String importedModuleId = statement.getFirstFirstChild().getChildAtIndex(1).getString();
        String variableName = statement.getFirstChild().getString();

        String exportedSymbolName;
        if (!googProvides.contains(importedModuleId)) {
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
        for (Entry<String, String> e :
            objectLiteralASTToStringMap(statement.getFirstFirstChild()).entrySet()) {
          String originalName = e.getKey();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String variableName = e.getValue();

          String exportedSymbolName;
          if (!googProvides.contains(importedModuleId)) {
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

        for (Entry<String, String> e :
            objectLiteralASTToStringMap(statement.getFirstFirstChild()).entrySet()) {
          String originalName = e.getKey();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String variableName = e.getValue();

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
}
