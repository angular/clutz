package com.google.javascript.gents;

import com.google.gson.Gson;
import java.util.Map;
import java.util.Set;

/**
 * Generates a log that maps how goog.modules/goog.provides where mapped to TS modules.
 *
 * <p>The log contains: - the original goog.module/goog.provide name. - the name of the TypeScript
 * file that contains the converted Closure module/namespace. - Gents never uses TS default exports.
 * This means if the original goog.module had a default export we generated a named export with a
 * specific name. The field 'defaultRename' contains that name. If there was no default export, the
 * field contains the empty string.
 *
 * <p>Ex: (in file buz.js) goog.module(foo.bar) class A { ... } exports = A;
 *
 * <p>is translated to buz.ts: export class A { ... }
 *
 * <p>Which generates the following log line: foo.bar,buz.ts,A
 */
class ModuleRenameLogger {
  private class LogItem {
    String originalName;
    String tsFile;
    String defaultRename;

    LogItem(String originalName, String tsFile, String defaultRename) {
      this.originalName = originalName;
      this.tsFile = tsFile;
      this.defaultRename = defaultRename;
    }
  }

  private Gson gson = new Gson();

  String generateModuleRewriteLog(
      Set<String> filesToConvert, Map<String, CollectModuleMetadata.FileModule> namespaceMap) {
    StringBuilder builder = new StringBuilder();
    for (Map.Entry<String, CollectModuleMetadata.FileModule> entry : namespaceMap.entrySet()) {
      String file = entry.getValue().file;
      String defaultRename =
          entry.getValue().exportedNamespacesToSymbols.getOrDefault("exports", "");
      if (filesToConvert.contains(file)) {
        builder.append(gson.toJson(new LogItem(entry.getKey(), file, defaultRename)));
        builder.append("\n");
      }
    }
    return builder.toString();
  }
}
