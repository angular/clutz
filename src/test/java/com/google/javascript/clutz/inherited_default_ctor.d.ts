declare namespace ಠ_ಠ.clutz.def.ctor {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    constructor (a : string ) ;
  }
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.def.ctor.A_Instance {
    constructor ( ) ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'def.ctor'): typeof ಠ_ಠ.clutz.def.ctor;
}
declare module 'goog:def.ctor' {
  import alias = ಠ_ಠ.clutz.def.ctor;
  export = alias;
}
