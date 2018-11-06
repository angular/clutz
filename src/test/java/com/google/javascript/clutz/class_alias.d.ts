declare namespace ಠ_ಠ.clutz.alias {
  type A = ಠ_ಠ.clutz.original.A ;
  let A : typeof ಠ_ಠ.clutz.original.A ;
  type A_Instance = ಠ_ಠ.clutz.original.A_Instance ;
  let A_Instance : typeof ಠ_ಠ.clutz.original.A_Instance ;
}
declare module 'goog:alias.A' {
  import A = ಠ_ಠ.clutz.alias.A;
  export default A;
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
declare module 'goog:original.A' {
  import A = ಠ_ಠ.clutz.original.A;
  export default A;
}
