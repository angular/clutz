// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/missing_direct_ref_base.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$extend {
  class ClassExtendingMissing extends ಠ_ಠ.clutz.direct.ref.A {
    private noStructuralTyping_module$exports$missing$extend_ClassExtendingMissing : any;
    constructor ( ) ;
  }
  class ClassExtendingMissingTemplated extends ಠ_ಠ.clutz.direct.ref.ATemplated < string , number > {
    private noStructuralTyping_module$exports$missing$extend_ClassExtendingMissingTemplated : any;
    constructor ( ) ;
  }
  class ClassExtendingMissingWithParam extends ಠ_ಠ.clutz.direct.ref.A {
    private noStructuralTyping_module$exports$missing$extend_ClassExtendingMissingWithParam : any;
    constructor (x : number ) ;
  }
}
declare module 'goog:missing.extend' {
  import extend = ಠ_ಠ.clutz.module$exports$missing$extend;
  export = extend;
}
