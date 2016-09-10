declare namespace ಠ_ಠ.clutz.alias {
  type A = ಠ_ಠ.clutz.original.A ;
  var A : typeof ಠ_ಠ.clutz.original.A ;
}
declare namespace goog {
  function require(name: 'alias.A'): typeof ಠ_ಠ.clutz.alias.A;
}
declare module 'goog:alias.A' {
  import alias = ಠ_ಠ.clutz.alias.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.original {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.original.A {
  class InnerC extends InnerC_Instance {
  }
  class InnerC_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'original.A'): typeof ಠ_ಠ.clutz.original.A;
}
declare module 'goog:original.A' {
  import alias = ಠ_ಠ.clutz.original.A;
  export default alias;
}
