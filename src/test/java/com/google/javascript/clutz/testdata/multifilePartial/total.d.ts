//!! The total.d.ts file is the result of a total compilation of the files in
//!! the multifilePartial directory, so that the total and partial compilations
//!! can be compared
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/missing_imported_base.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$imported$base {
  class ClassExtendingDefaultObjectExporterBaseClass extends module$contents$default$object$exporter_BaseClass {
    private noStructuralTyping_module$exports$missing$imported$base_ClassExtendingDefaultObjectExporterBaseClass : any;
  }
  class ClassExtendingMissingDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.MissingDestructuredRequire {
    private noStructuralTyping_module$exports$missing$imported$base_ClassExtendingMissingDestructuredRequire : any;
  }
  class ClassExtendingMissingRequire extends module$exports$default$base$exporter {
    private noStructuralTyping_module$exports$missing$imported$base_ClassExtendingMissingRequire : any;
  }
  class ClassExtendingRenamedDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.OriginalName {
    private noStructuralTyping_module$exports$missing$imported$base_ClassExtendingRenamedDestructuredRequire : any;
  }
  let DeclarationOfMissingRequire : module$exports$default$base$exporter | null ;
  function FuncWithMissingRequireParam (c : module$exports$default$base$exporter | null ) : void ;
}
declare module 'goog:missing.imported.base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/named_base_exporter.js
declare namespace ಠ_ಠ.clutz.module$exports$named$base$exporter {
  class MissingDestructuredRequire {
    private noStructuralTyping_module$exports$named$base$exporter_MissingDestructuredRequire : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/named_base_exporter.js
declare namespace ಠ_ಠ.clutz.module$exports$named$base$exporter {
  class OriginalName {
    private noStructuralTyping_module$exports$named$base$exporter_OriginalName : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/default_base_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$default$base$exporter {
    private noStructuralTyping_module$exports$default$base$exporter : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multifilePartial/default_object_exporter.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$default$object$exporter_BaseClass {
    private noStructuralTyping_module$contents$default$object$exporter_BaseClass : any;
  }
}
