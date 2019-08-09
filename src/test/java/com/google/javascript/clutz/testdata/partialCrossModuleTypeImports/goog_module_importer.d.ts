// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_module_importer.js
declare namespace ಠ_ಠ.clutz.module$exports$goog$module$importer {
  class ClassExtendingLegacyBaseClass extends ಠ_ಠ.clutz.module$exports$goog$legacy$namespace$exporter.LegacyBaseClass {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingLegacyBaseClass : any;
    constructor ( ) ;
  }
  class ClassExtendingMissingRequire extends ಠ_ಠ.clutz.googprovide.exporter {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingMissingRequire : any;
    constructor ( ) ;
  }
  class ClassExtendingRename extends ಠ_ಠ.clutz.module$exports$goog$legacy$namespace$exporter.OriginalName {
    private noStructuralTyping_module$exports$goog$module$importer_ClassExtendingRename : any;
    constructor ( ) ;
  }
}
declare module 'goog:goog.module.importer' {
  import importer = ಠ_ಠ.clutz.module$exports$goog$module$importer;
  export = importer;
}
