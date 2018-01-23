declare namespace ಠ_ಠ.clutz {
  class module$exports$suppress$A extends module$exports$suppress$A_Instance {
  }
  class module$exports$suppress$A_Instance {
    private noStructuralTyping_: any;
    foo ( ) : number ;
  }
  class module$exports$suppress$B extends module$exports$suppress$B_Instance {
  }
  class module$exports$suppress$B_Instance extends ಠ_ಠ.clutz.module$exports$suppress$A_Instance {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$suppress {
  export import A = ಠ_ಠ.clutz.module$exports$suppress$A;
}
declare namespace ಠ_ಠ.clutz.module$exports$suppress {
  export import B = ಠ_ಠ.clutz.module$exports$suppress$B;
}
declare module 'goog:suppress' {
  import alias = ಠ_ಠ.clutz.module$exports$suppress;
  export = alias;
}
