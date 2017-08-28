declare namespace ಠ_ಠ.clutz.namedType {
  class A < U > extends A_Instance < U > {
  }
  class A_Instance < U > {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz.namedType.D < any > ) : any ;
  }
}
declare module 'goog:namedType.A' {
  import alias = ಠ_ಠ.clutz.namedType.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T > extends D_Instance < T > {
  }
  class D_Instance < T > {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:namedType.D' {
  import alias = ಠ_ಠ.clutz.namedType.D;
  export default alias;
}
