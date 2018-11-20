//!! The total.d.ts file is the result of a total compilation of the files in
//!! the multifilePartial directory, so that the total and partial compilations
//!! can be compared
declare namespace ಠ_ಠ.clutz.module$exports$missing$imported$base {
  class ClassExtendingDefaultObjectExporterBaseClass extends module$contents$default$object$exporter_BaseClass {
  }
  class ClassExtendingMissingDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.MissingDestructuredRequire {
  }
  class ClassExtendingMissingRequire extends module$exports$default$base$exporter {
  }
  class ClassExtendingRenamedDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.OriginalName {
  }
  let DeclarationOfMissingRequire : module$exports$default$base$exporter | null ;
  function FuncWithMissingRequireParam (c : module$exports$default$base$exporter | null ) : void ;
}
declare module 'goog:missing.imported.base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
}
declare namespace ಠ_ಠ.clutz.module$exports$named$base$exporter {
  class MissingDestructuredRequire {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$named$base$exporter {
  class OriginalName {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$default$base$exporter {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$default$object$exporter_BaseClass {
    private noStructuralTyping_: any;
  }
}
