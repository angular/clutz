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
      String localModuleId, Node moduleBody, Set<String> googProvides) {
    Map<String, String> aliasMap = new HashMap<>();
    if (localModuleId == null) {
      // TODO(lucassloan): handle goog.module.get()
      return aliasMap;
    }

    // Loop over the statements, looking for import statements, and build a map from the local variable
    // names to the original symbol name eg `const C = goog.require('a.b.c');` will result in the map
    // containing 'C' -> 'module$exports$a$b$c'
    Map<String, String> localVariableToImportedSymbolNameMap = new HashMap<>();
    for (Node statement : moduleBody.children()) {
      if (isImportAssignment(statement)) {
        // `const C = goog.require()` or
        // `const C = goog.module.get()`
        String importedModuleId = statement.getFirstFirstChild().getSecondChild().getString();
        String localVariableName = statement.getFirstChild().getString();

        String importedSymbolName = buildWholeModuleExportSymbolName(importedModuleId);
        localVariableToImportedSymbolNameMap.put(localVariableName, importedSymbolName);
      } else if (isImportDestructuringAssignment(statement)) {
        // `const {C, Clazz: RenamedClazz} = goog.require()` or
        // `const {C, Clazz: RenamedClazz} = goog.module.get()`
        String importedModuleId =
            statement.getFirstChild().getChildAtIndex(1).getSecondChild().getString();
        for (Node destructured : statement.getFirstFirstChild().children()) {
          String originalName = destructured.getString();
          // Destructuring can use the original name `const {A} = goog.require("foo.a")` or rename
          // it `const {A: RenamedA} = ...`, and closure uses whichever in the symbol name it
          // generates, so we have to extract it.
          String localVariableName;
          if (destructured.hasChildren()) {
            // Renaming
            localVariableName = destructured.getFirstChild().getString();
          } else {
            // No rename
            localVariableName = originalName;
          }

          String importedSymbolName = buildNamedExportSymbolName(importedModuleId, originalName);
          localVariableToImportedSymbolNameMap.put(localVariableName, importedSymbolName);
        }
      } else if (statement.isConst() && statement.getFirstChild().isName()) {
        // Look for `const x = someImport;`, where someImport is a local from one of the above.
        // This is to handle the case like:
        //   const a = goog.require(...);  // handled above
        //   const b = a;  // handled here
        String localVariableName = statement.getFirstChild().getString();
        Node target = statement.getFirstFirstChild();
        if (target.isName()) {
          String imported = localVariableToImportedSymbolNameMap.get(target.getQualifiedName());
          if (imported != null) {
            localVariableToImportedSymbolNameMap.put(localVariableName, imported);
          }
        }
      }
    }

    // Loop over the statements, looking for export statements, and add mappings to the alias map
    // if the export is of a variable that was imported
    for (Node statement : moduleBody.children()) {
      if (isWholeModuleExportAssignment(statement)) {
        // `exports = foo`
        String localVariableName = getExportsAssignmentRHS(statement);

        if (localVariableToImportedSymbolNameMap.containsKey(localVariableName)) {
          aliasMap.put(
              buildWholeModuleExportSymbolName(localModuleId),
              localVariableToImportedSymbolNameMap.get(localVariableName));
        }
      } else if (isNamedExportAssignment(statement)) {
        // `exports.foo = foo;`
        String localVariableName = getExportsAssignmentRHS(statement);
        String exportName = getNamedExportName(statement);

        if (localVariableToImportedSymbolNameMap.containsKey(localVariableName)) {
          aliasMap.put(
              buildNamedExportSymbolName(localModuleId, exportName),
              localVariableToImportedSymbolNameMap.get(localVariableName));
        }
      } else if (isNamedExportPropAssignment(statement)) {
        // `exports.foo = foo.bar;`
        String localVariableName = getExportsAssignmentPropRootName(statement);
        if (localVariableName.equals("exports")) {
          // This is a "local" alias between two exports from the same module.
          // There is no need to for clutz to special handle this, as the JS
          // Compiler will resolve this properly.
          continue;
        }
        String localPropName = getExportsAssignmentPropName(statement);
        String exportName = getNamedExportName(statement);
        String localNamespaceName =
            localVariableToImportedSymbolNameMap.getOrDefault(localVariableName, localVariableName);
        aliasMap.put(
            buildNamedExportSymbolName(localModuleId, exportName),
            localNamespaceName + "." + localPropName);
      }
    }

    return aliasMap;
  }
}
