declare namespace ಠ_ಠ.clutz.alias {
  type A = ಠ_ಠ.clutz.original.A ;
  let A : typeof ಠ_ಠ.clutz.original.A ;
}
declare module 'goog:alias.A' {
  import A = ಠ_ಠ.clutz.alias.A;
  export default A;
}
declare namespace ಠ_ಠ.clutz.original {
  class A {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.original.A {
  class InnerC {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:original.A' {
  import A = ಠ_ಠ.clutz.original.A;
  export default A;
}
