package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * When a goog.module imports a symbol, there's an ambiguity about whether the symbol is from a
 * goog.provide style file or a goog.module style file. Normally this ambiguity is resolved by
 * consulting JsSummary, but a goog.module can declareLegacyNamespace, in which case its exports are
 * in goog.provide style, but the JsSummary says it's a goog.module. To resolve this ambiguity,
 * LegacyNamespaceReexportMapBuilder generates mappings from the goog.module style symbols to the
 * normally declared symbols, so DeclarationGenerator can produce aliases.
 *
 * TODO(b/161134788): Consume this information from JsTrimmer summaries instead of this class.
 */
public class LegacyNamespaceReexportMapBuilder extends ImportBasedMapBuilder {

  @Override
  protected Map<String, String> build(
      String localModuleId, Node moduleBody, Set<String> googProvides) {
    Map<String, String> reexportMap = new LinkedHashMap<>();
    if (localModuleId == null) {
      return reexportMap;
    }

    if (!isLegacyNamespaceModule(moduleBody)) {
      return reexportMap;
    }

    for (Node statement : moduleBody.children()) {
      if (isWholeModuleExportAssignment(statement)) {
        // `exports = foo`
        String localVariableName = getExportsAssignmentRHS(statement);

        reexportMap.put(
            buildWholeModuleExportSymbolName(localModuleId),
            buildLocalSymbolName(localModuleId, localVariableName));
      } else if (isNamedExportAssignment(statement)) {
        // `exports.foo = foo`
        String localVariableName = getExportsAssignmentRHS(statement);
        String exportName = getNamedExportName(statement);

        reexportMap.put(
            buildNamedExportSymbolName(localModuleId, exportName),
            buildLocalSymbolName(localModuleId, localVariableName));
      } else if (isObjectLiteralExport(statement)) {
        // `exports = {foo, bar}`
        for (Entry<String, String> e :
            objectLiteralASTToStringMap(statement.getFirstChild().getSecondChild()).entrySet()) {
          String localVariableName = e.getValue();
          String exportName = e.getKey();

          reexportMap.put(
              buildNamedExportSymbolName(localModuleId, exportName),
              buildLocalSymbolName(localModuleId, localVariableName));
        }
      }
    }
    return reexportMap;
  }

  private boolean isLegacyNamespaceModule(Node moduleBody) {
    for (Node statement : moduleBody.children()) {
      if (isDeclareLegacyNamespaceStatement(statement)) {
        return true;
      }
    }
    return false;
  }

  /** Matches `goog.module.declareLegacyNamespace();` */
  protected boolean isDeclareLegacyNamespaceStatement(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isCall()) {
      return false;
    }

    Node callBody = statement.getFirstFirstChild();

    return callBody.matchesQualifiedName("goog.module.declareLegacyNamespace");
  }
}
