package com.google.javascript.gents;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
  static class LogItem {
    String originalName;
    String jsFile;
    String defaultRename;

    LogItem(String originalName, String jsFile, String defaultRename) {
      this.originalName = originalName;
      this.jsFile = jsFile;
      this.defaultRename = defaultRename;
    }

    @Override
    public boolean equals(Object obj) {
      if (!(obj instanceof LogItem)) return false;
      LogItem o = (LogItem) obj;
      return this.originalName.equals(o.originalName)
          && this.jsFile.equals(o.jsFile)
          && this.defaultRename.equals(o.defaultRename);
    }

    @Override
    public String toString() {
      return "{originalName: "
          + this.originalName
          + ",\n"
          + "{jsFile: "
          + this.jsFile
          + ",\n"
          + "{defaultRename: "
          + this.defaultRename
          + "}";
    }

    @Override
    public int hashCode() {
      return Objects.hash(this.originalName, this.jsFile, this.defaultRename);
    }
  }

  private Gson gson = new GsonBuilder().setPrettyPrinting().create();

  String generateModuleRewriteLog(
      Set<String> filesToConvert, Map<String, CollectModuleMetadata.FileModule> namespaceMap) {
    List<LogItem> items = new ArrayList<>();
    for (Map.Entry<String, CollectModuleMetadata.FileModule> entry : namespaceMap.entrySet()) {
      String file = entry.getValue().file;
      String defaultRename =
          entry.getValue().exportedNamespacesToSymbols.getOrDefault("exports", "");
      if (filesToConvert.contains(file)) {
        items.add(new LogItem(entry.getKey(), file, defaultRename));
      }
    }
    return gson.toJson(items);
  }
}
