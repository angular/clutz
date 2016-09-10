declare namespace ಠ_ಠ.clutz.suppress {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    foo ( ) : number ;
  }
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.suppress.A_Instance {
  }
}
declare namespace goog {
  function require(name: 'suppress'): typeof ಠ_ಠ.clutz.suppress;
}
declare module 'goog:suppress' {
  import alias = ಠ_ಠ.clutz.suppress;
  export = alias;
}
