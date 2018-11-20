declare namespace ಠ_ಠ.clutz.module$exports$missing$imported$base {
  class ClassExtendingDefaultObjectExporterBaseClass extends ಠ_ಠ.clutz.module$exports$default$object$exporter.BaseClass {
    constructor ( ...a : any [] ) ;
  }
  class ClassExtendingMissingDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.MissingDestructuredRequire {
    constructor ( ...a : any [] ) ;
  }
  class ClassExtendingMissingRequire extends ಠ_ಠ.clutz.module$exports$default$base$exporter {
    constructor ( ...a : any [] ) ;
  }
  class ClassExtendingRenamedDestructuredRequire extends ಠ_ಠ.clutz.module$exports$named$base$exporter.OriginalName {
    constructor ( ...a : any [] ) ;
  }
  let DeclarationOfMissingRequire : ಠ_ಠ.clutz.module$exports$default$base$exporter | null ;
  function FuncWithMissingRequireParam (c : ಠ_ಠ.clutz.module$exports$default$base$exporter | null ) : void ;
}
declare module 'goog:missing.imported.base' {
  import base = ಠ_ಠ.clutz.module$exports$missing$imported$base;
  export = base;
}
