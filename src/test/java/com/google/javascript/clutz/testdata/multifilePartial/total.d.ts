//!! The total.d.ts file is the result of a total compilation of the files in
//!! the multifilePartial directory, so that the total and partial compilations
//!! can be compared
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$imported$base {
  export import ClassExtendingDefaultObjectExporterBaseClass = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass ;
  export import ClassExtendingMissingDestructuredRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire ;
  export import ClassExtendingMissingRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingMissingRequire ;
  export import ClassExtendingRenamedDestructuredRequire = ಠ_ಠ.clutz.module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire ;
  let DeclarationOfMissingRequire : module$contents$default$base$exporter_DefaultExportBaseClass | null ;
  function FuncWithMissingRequireParam (c : module$contents$default$base$exporter_DefaultExportBaseClass | null ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare module 'goog:missing.imported.base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/default_base_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$default$base$exporter_DefaultExportBaseClass {
    private noStructuralTyping_module$contents$default$base$exporter_DefaultExportBaseClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingMissingRequire extends module$contents$default$base$exporter_DefaultExportBaseClass {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingMissingRequire : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire extends module$contents$named$base$exporter_MissingDestructuredRequire {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingMissingDestructuredRequire : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire extends module$contents$named$base$exporter_OriginalName {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingRenamedDestructuredRequire : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass extends module$contents$default$object$exporter_BaseClass {
    private noStructuralTyping_module$contents$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/named_base_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$named$base$exporter_MissingDestructuredRequire {
    private noStructuralTyping_module$contents$named$base$exporter_MissingDestructuredRequire : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/named_base_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$named$base$exporter_OriginalName {
    private noStructuralTyping_module$contents$named$base$exporter_OriginalName : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/default_object_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$default$object$exporter_BaseClass {
    private noStructuralTyping_module$contents$default$object$exporter_BaseClass : any;
  }
}
