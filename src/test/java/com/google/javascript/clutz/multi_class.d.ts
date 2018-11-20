declare namespace ಠ_ಠ.clutz.multi_class {
  class A {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    a : number ;
  }
  class B extends ಠ_ಠ.clutz.multi_class.A implements ಠ_ಠ.clutz.multi_class.I , ಠ_ಠ.clutz.multi_class.I2 {
    constructor ( ) ;
    b : number ;
    noop ( ) : void ;
  }
  class C extends ಠ_ಠ.clutz.multi_class.B {
    constructor ( ) ;
  }
  class D implements ಠ_ಠ.clutz.multi_class.I {
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
