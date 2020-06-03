// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz.module$exports$goog$module$importer {
  export import ClassExtendingLegacyBaseClass = ಠ_ಠ.clutz.module$contents$goog$module$importer_ClassExtendingLegacyBaseClass ;
  export import ClassExtendingMissingRequire = ಠ_ಠ.clutz.module$contents$goog$module$importer_ClassExtendingMissingRequire ;
  export import ClassExtendingRename = ಠ_ಠ.clutz.module$contents$goog$module$importer_ClassExtendingRename ;
  export import ReexportedMissingGoogRequire = ಠ_ಠ.clutz.googprovide.exporter ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare module 'goog:goog.module.importer' {
  import importer = ಠ_ಠ.clutz.module$exports$goog$module$importer;
  export = importer;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$goog$module$importer_ClassExtendingMissingRequire extends ಠ_ಠ.clutz.googprovide.exporter {
    private noStructuralTyping_module$contents$goog$module$importer_ClassExtendingMissingRequire : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$goog$module$importer_ClassExtendingLegacyBaseClass extends ಠ_ಠ.clutz.module$exports$goog$legacy$namespace$exporter.LegacyBaseClass {
    private noStructuralTyping_module$contents$goog$module$importer_ClassExtendingLegacyBaseClass : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$goog$module$importer_ClassExtendingRename extends ಠ_ಠ.clutz.module$exports$goog$legacy$namespace$exporter.OriginalName {
    private noStructuralTyping_module$contents$goog$module$importer_ClassExtendingRename : any;
    constructor ( ) ;
  }
}
