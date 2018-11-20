declare namespace ಠ_ಠ.clutz.namedType {
  class A < U > {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz.namedType.D < U > ) : any ;
  }
}
declare module 'goog:namedType.A' {
  import A = ಠ_ಠ.clutz.namedType.A;
  export default A;
}
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T > {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:namedType.D' {
  import D = ಠ_ಠ.clutz.namedType.D;
  export default D;
}
