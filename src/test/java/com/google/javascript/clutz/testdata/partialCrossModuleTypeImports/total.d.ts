// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz.module$exports$goog$module$importer {
  class ClassExtendingLegacyBaseClass extends module$contents$goog$legacy$namespace$exporter_LegacyBaseClass {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingLegacyBaseClass : any;
  }
  class ClassExtendingMissingRequire extends ಠ_ಠ.clutz.googprovide.exporter {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingMissingRequire : any;
  }
  class ClassExtendingRename extends module$contents$goog$legacy$namespace$exporter_OriginalName {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingRename : any;
  }
}
declare module 'goog:goog.module.importer' {
  import importer = ಠ_ಠ.clutz.module$exports$goog$module$importer;
  export = importer;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_provide_exporter.js
declare namespace ಠ_ಠ.clutz.googprovide {
  class exporter {
    private noStructuralTyping_googprovide_exporter : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_legacy_namespace_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$goog$legacy$namespace$exporter_LegacyBaseClass {
    private noStructuralTyping_module$contents$goog$legacy$namespace$exporter_LegacyBaseClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_legacy_namespace_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$goog$legacy$namespace$exporter_OriginalName {
    private noStructuralTyping_module$contents$goog$legacy$namespace$exporter_OriginalName : any;
  }
}
