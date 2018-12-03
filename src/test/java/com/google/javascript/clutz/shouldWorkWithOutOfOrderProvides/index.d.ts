declare namespace ಠ_ಠ.clutz.dep {
  class D {
    private noStructuralTyping_dep_D : any;
  }
}
declare module 'goog:dep.D' {
  import D = ಠ_ಠ.clutz.dep.D;
  export default D;
}
declare namespace ಠ_ಠ.clutz.main {
  class A {
    private noStructuralTyping_main_A : any;
    fn (a : ಠ_ಠ.clutz.dep.D ) : void ;
  }
}
declare module 'goog:main.A' {
  import A = ಠ_ಠ.clutz.main.A;
  export default A;
}
