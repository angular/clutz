package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Closure doesn't handle alias reexports like the following well:
 *
 * <p>`goog.module('bare.reexport'); const {Class} = goog.require('original.module'); exports =
 * Class;`
 *
 * <p>It completely ignores the goog.require() and gives Class the unknown {?} type.
 *
 * <p>AliasMapBuilder looks for goog.require statements and generates mappings from the exported
 * name of Class (here module$exports$bare$reexport) to the name of the imported symbol (here
 * module$exports$original$module.Class), so if clutz finds a symbol that has no type, it can emit
 * it as an alias to the correct symbol.
 */
public class AliasMapBuilder extends ImportBasedMapBuilder {
  @Override
  protected Map<String, String> build(
      String localModuleId, Node moduleBody, Set<String> knownGoogProvides) {
    Map<String, String> aliasMap = new HashMap<>();
    if (localModuleId == null) {
      //TODO(lucassloan): handle goog.module.get()
      return aliasMap;
    }

    for (Node statement : moduleBody.children()) {
      if (isImportAssignment(statement)) {
        // `const C = goog.require()` or
        // `const C = goog.module.get()`
        String importedModuleId = statement.getFirstFirstChild().getChildAtIndex(1).getString();
        String variableName = statement.getFirstChild().getString();

        String exportedSymbolName = buildWholeModuleExportSymbolName(importedModuleId);
        aliasMap.putAll(
            buildNamedAndWholeModuleMappings(localModuleId, variableName, exportedSymbolName));

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

          String exportedSymbolName = buildNamedExportSymbolName(importedModuleId, originalName);
          aliasMap.putAll(
              buildNamedAndWholeModuleMappings(localModuleId, variableName, exportedSymbolName));
        }
      }
    }

    return aliasMap;
  }

  /**
   * To avoid parsing for the export statements, generate mappings for both styles of exports from
   * goog.modules.
   *
   * <p>`exports = Foo` produces the name `module$exports$module$Name` `exports.Foo = Foo` produces
   * the name `module$exports$module$Name.Foo`
   */
  private static Map<String, String> buildNamedAndWholeModuleMappings(
      String localModuleId, String variableName, String exportedSymbolName) {
    //TODO(lucassloan): handle knownGoogProvides
    Map<String, String> mappings = new HashMap<>();
    // exports = Foo
    mappings.put(buildWholeModuleExportSymbolName(localModuleId), exportedSymbolName);
    // exports.Foo = Foo
    mappings.put(buildNamedExportSymbolName(localModuleId, variableName), exportedSymbolName);

    return mappings;
  }
}
