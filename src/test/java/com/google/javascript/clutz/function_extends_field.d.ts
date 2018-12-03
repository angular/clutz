declare namespace ಠ_ಠ.clutz.fn.field {
  class A {
    private noStructuralTyping_fn_field_A : any;
    f : any ;
    g : any ;
    h ( ) : number ;
    pf : any ;
    pg : any ;
    ph ( ) : number ;
  }
  class B extends ಠ_ಠ.clutz.fn.field.A {
    private noStructuralTyping_fn_field_B : any;
    f : ( ) => number ;
    h ( ) : number ;
    pf : ( ) => number ;
    ph ( ) : number ;
  }
  class C extends ಠ_ಠ.clutz.fn.field.B {
    private noStructuralTyping_fn_field_C : any;
    g : ( ) => number ;
    pg : ( ) => number ;
  }
}
declare module 'goog:fn.field' {
  import field = ಠ_ಠ.clutz.fn.field;
  export = field;
}
