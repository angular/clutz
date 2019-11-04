// Generated from src/test/java/com/google/javascript/clutz/testdata/multi_class.js
declare namespace ಠ_ಠ.clutz.multi_class {
  class A {
    private noStructuralTyping_multi_class_A : any;
    constructor (n : number ) ;
    a : number ;
  }
  class B extends ಠ_ಠ.clutz.multi_class.A implements ಠ_ಠ.clutz.multi_class.I , ಠ_ಠ.clutz.multi_class.I2 {
    private noStructuralTyping_multi_class_B : any;
    constructor ( ) ;
    b : number ;
    noop ( ) : void ;
  }
  class C extends ಠ_ಠ.clutz.multi_class.B {
    private noStructuralTyping_multi_class_C : any;
    constructor ( ) ;
  }
  class D implements ಠ_ಠ.clutz.multi_class.I {
    private noStructuralTyping_multi_class_D : any;
  }
  interface I {
  }
  interface I2 extends ಠ_ಠ.clutz.multi_class.I {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/multi_class.js
declare module 'goog:multi_class' {
  import multi_class = ಠ_ಠ.clutz.multi_class;
  export = multi_class;
}
