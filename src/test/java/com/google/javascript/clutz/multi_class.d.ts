declare namespace ಠ_ಠ.clutz_internal.multi_class {
  class A {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    a : number ;
  }
  class B extends ಠ_ಠ.clutz_internal.multi_class.A implements ಠ_ಠ.clutz_internal.multi_class.I , ಠ_ಠ.clutz_internal.multi_class.I2 {
    b : number ;
    noop ( ) : void ;
  }
  class C extends ಠ_ಠ.clutz_internal.multi_class.B {
  }
  class D implements ಠ_ಠ.clutz_internal.multi_class.I {
    private noStructuralTyping_: any;
  }
  interface I {
  }
  interface I2 extends ಠ_ಠ.clutz_internal.multi_class.I {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'multi_class'): typeof ಠ_ಠ.clutz_internal.multi_class;
}
declare module 'goog:multi_class' {
  import alias = ಠ_ಠ.clutz_internal.multi_class;
  export = alias;
}
