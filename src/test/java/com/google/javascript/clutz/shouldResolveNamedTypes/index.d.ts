declare namespace ಠ_ಠ.clutz.namedType {
  class A < U > extends A_Instance < U > {
  }
  class A_Instance < U > {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz.namedType.D < U > ) : any ;
  }
}
declare module 'goog:namedType.A' {
  import A = ಠ_ಠ.clutz.namedType.A;
  export default A;
}
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T > extends D_Instance < T > {
  }
  class D_Instance < T > {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:namedType.D' {
  import D = ಠ_ಠ.clutz.namedType.D;
  export default D;
}
