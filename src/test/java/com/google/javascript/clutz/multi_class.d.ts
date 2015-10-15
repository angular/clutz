declare namespace ಠ_ಠ.clutz_internal.multi_class {
  class A {
    constructor (n : number ) ;
    a : number ;
  }
  class B extends A implements I , I2 {
    b : number ;
    noop ( ) : void ;
  }
  class C extends B {
  }
  class D implements I {
  }
  interface I {
  }
  interface I2 extends I {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'multi_class'): typeof ಠ_ಠ.clutz_internal.multi_class;
}
declare module 'goog:multi_class' {
  import alias = ಠ_ಠ.clutz_internal.multi_class;
  export = alias;
}
