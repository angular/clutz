declare namespace ಠ_ಠ.clutz.def.ctor {
  class A {
    private noStructuralTyping_def_ctor_A : any;
    constructor (a : string ) ;
  }
  class B extends ಠ_ಠ.clutz.def.ctor.A {
    private noStructuralTyping_def_ctor_B : any;
    constructor ( ) ;
  }
}
declare module 'goog:def.ctor' {
  import ctor = ಠ_ಠ.clutz.def.ctor;
  export = ctor;
}
