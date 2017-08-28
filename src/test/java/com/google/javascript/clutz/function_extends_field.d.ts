declare namespace ಠ_ಠ.clutz.fn.field {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    f : any ;
    g : any ;
    h ( ) : number ;
    pf : any ;
    pg : any ;
    ph ( ) : number ;
  }
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.fn.field.A_Instance {
    f : ( ) => number ;
    h ( ) : number ;
    pf : ( ) => number ;
    ph ( ) : number ;
  }
  class C extends C_Instance {
  }
  class C_Instance extends ಠ_ಠ.clutz.fn.field.B_Instance {
    g : ( ) => number ;
    pg : ( ) => number ;
  }
}
declare module 'goog:fn.field' {
  import alias = ಠ_ಠ.clutz.fn.field;
  export = alias;
}
