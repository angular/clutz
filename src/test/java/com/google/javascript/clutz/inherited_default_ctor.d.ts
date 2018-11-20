declare namespace ಠ_ಠ.clutz.def.ctor {
  class A {
    private noStructuralTyping_: any;
    constructor (a : string ) ;
  }
  class B extends ಠ_ಠ.clutz.def.ctor.A {
    constructor ( ) ;
  }
}
declare module 'goog:def.ctor' {
  import ctor = ಠ_ಠ.clutz.def.ctor;
  export = ctor;
}
