declare namespace ಠ_ಠ.clutz.module$exports$missing$extend {
  class ClassExtendingMissing extends ಠ_ಠ.clutz.direct.ref.A {
    constructor ( ) ;
  }
  class ClassExtendingMissingTemplated extends ಠ_ಠ.clutz.direct.ref.ATemplated < string , number > {
    constructor ( ) ;
  }
  class ClassExtendingMissingWithParam extends ಠ_ಠ.clutz.direct.ref.A {
    constructor (x : number ) ;
  }
}
declare module 'goog:missing.extend' {
  import extend = ಠ_ಠ.clutz.module$exports$missing$extend;
  export = extend;
}
