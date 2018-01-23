declare namespace ಠ_ಠ.clutz {
  type module$exports$alias$A = ಠ_ಠ.clutz.module$exports$original$A ;
  var module$exports$alias$A : typeof ಠ_ಠ.clutz.module$exports$original$A ;
}
declare namespace ಠ_ಠ.clutz.module$exports$alias {
  export import A = ಠ_ಠ.clutz.module$exports$alias$A;
}
declare module 'goog:alias.A' {
  import alias = ಠ_ಠ.clutz.module$exports$alias$A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$original$A extends module$exports$original$A_Instance {
  }
  class module$exports$original$A_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$original {
  export import A = ಠ_ಠ.clutz.module$exports$original$A;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$original$A$InnerC extends module$exports$original$A$InnerC_Instance {
  }
  class module$exports$original$A$InnerC_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$original.A {
  export import InnerC = ಠ_ಠ.clutz.module$exports$original$A$InnerC;
}
declare namespace ಠ_ಠ.clutz.module$exports$original$A {
  export import InnerC = ಠ_ಠ.clutz.module$exports$original$A$InnerC;
}
declare module 'goog:original.A' {
  import alias = ಠ_ಠ.clutz.module$exports$original$A;
  export default alias;
}
