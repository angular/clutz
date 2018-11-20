declare namespace ಠ_ಠ.clutz.fn.field {
  class A {
    private noStructuralTyping_: any;
    f : any ;
    g : any ;
    h ( ) : number ;
    pf : any ;
    pg : any ;
    ph ( ) : number ;
  }
  class B extends ಠ_ಠ.clutz.fn.field.A {
    f : ( ) => number ;
    h ( ) : number ;
    pf : ( ) => number ;
    ph ( ) : number ;
  }
  class C extends ಠ_ಠ.clutz.fn.field.B {
    g : ( ) => number ;
    pg : ( ) => number ;
  }
}
declare module 'goog:fn.field' {
  import field = ಠ_ಠ.clutz.fn.field;
  export = field;
}
