declare namespace ಠ_ಠ.clutz.dep {
  class D extends D_Instance {
  }
  class D_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:dep.D' {
  import alias = ಠ_ಠ.clutz.dep.D;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.main {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz.dep.D ) : void ;
  }
}
declare module 'goog:main.A' {
  import alias = ಠ_ಠ.clutz.main.A;
  export default alias;
}
