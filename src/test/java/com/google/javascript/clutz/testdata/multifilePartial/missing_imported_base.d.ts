// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$imported$base {
  export import ClassExtendingDefaultObjectExporterBaseClass = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass ;
  export import ClassExtendingMissingDestructuredRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire ;
  export import ClassExtendingMissingRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingMissingRequire ;
  export import ClassExtendingRenamedDestructuredRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire ;
  let DeclarationOfMissingRequire : ಠ_ಠ.clutz.module$exports$default$base$exporter | null ;
  function FuncWithMissingRequireParam (c : ಠ_ಠ.clutz.module$exports$default$base$exporter | null ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare module 'goog:missing.imported.base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
  const __clutz_actual_namespace: 'missing.imported.base';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingMissingRequire extends ಠ_ಠ.clutz.module$exports$default$base$exporter {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingMissingRequire : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.MissingDestructuredRequire {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.OriginalName {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass extends ಠ_ಠ.clutz.module$exports$default$object$exporter.BaseClass {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass : any;
    constructor ( ) ;
  }
}
