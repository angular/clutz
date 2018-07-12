declare namespace ಠ_ಠ.clutz.module$exports$missing$extend {
  class ClassExtendingMissing extends ClassExtendingMissing_Instance {
  }
  class ClassExtendingMissing_Instance extends ಠ_ಠ.clutz.direct.ref.A_Instance {
    constructor ( ) ;
  }
  class ClassExtendingMissingTemplated extends ClassExtendingMissingTemplated_Instance {
  }
  class ClassExtendingMissingTemplated_Instance extends ಠ_ಠ.clutz.direct.ref.ATemplated_Instance < string , number > {
    constructor ( ) ;
  }
  class ClassExtendingMissingWithParam extends ClassExtendingMissingWithParam_Instance {
  }
  class ClassExtendingMissingWithParam_Instance extends ಠ_ಠ.clutz.direct.ref.A_Instance {
    constructor (x : number ) ;
  }
}
declare module 'goog:missing.extend' {
  import extend = ಠ_ಠ.clutz.module$exports$missing$extend;
  export = extend;
}
