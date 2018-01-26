declare namespace ಠ_ಠ.clutz.module$exports$def$ctor {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    constructor (a : string ) ;
  }
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.module$exports$def$ctor.A_Instance {
    constructor ( ) ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$def.ctor {
  export import A =  ಠ_ಠ.clutz.module$exports$def$ctor.A;
}
declare namespace ಠ_ಠ.clutz.module$exports$def.ctor {
  export import B =  ಠ_ಠ.clutz.module$exports$def$ctor.B;
}
declare module 'goog:def.ctor' {
  import alias = ಠ_ಠ.clutz.module$exports$def$ctor;
  export = alias;
}
