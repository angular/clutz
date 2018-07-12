declare namespace ಠ_ಠ.clutz.multi_class {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    a : number ;
  }
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.multi_class.A_Instance implements ಠ_ಠ.clutz.multi_class.I , ಠ_ಠ.clutz.multi_class.I2 {
    constructor ( ) ;
    b : number ;
    noop ( ) : void ;
  }
  class C extends C_Instance {
  }
  class C_Instance extends ಠ_ಠ.clutz.multi_class.B_Instance {
    constructor ( ) ;
  }
  class D extends D_Instance {
  }
  class D_Instance implements ಠ_ಠ.clutz.multi_class.I {
    private noStructuralTyping_: any;
  }
  interface I {
  }
  interface I2 extends ಠ_ಠ.clutz.multi_class.I {
  }
}
declare module 'goog:multi_class' {
  import multi_class = ಠ_ಠ.clutz.multi_class;
  export = multi_class;
}
