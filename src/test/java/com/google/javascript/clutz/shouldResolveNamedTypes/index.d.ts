declare namespace ಠ_ಠ.clutz.namedType {
  class A < U > {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz.namedType.D < any > ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'namedType.A'): typeof ಠ_ಠ.clutz.namedType.A;
}
declare module 'goog:namedType.A' {
  import alias = ಠ_ಠ.clutz.namedType.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T > {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'namedType.D'): typeof ಠ_ಠ.clutz.namedType.D;
}
declare module 'goog:namedType.D' {
  import alias = ಠ_ಠ.clutz.namedType.D;
  export default alias;
}
