declare namespace ಠ_ಠ.clutz_internal.namedType {
  class A < U > {
    private noStructuralTyping_: any;
    fn (a : ಠ_ಠ.clutz_internal.namedType.D < any > ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'namedType.A'): typeof ಠ_ಠ.clutz_internal.namedType.A;
}
declare module 'goog:namedType.A' {
  import alias = ಠ_ಠ.clutz_internal.namedType.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.namedType {
  class D < T > {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'namedType.D'): typeof ಠ_ಠ.clutz_internal.namedType.D;
}
declare module 'goog:namedType.D' {
  import alias = ಠ_ಠ.clutz_internal.namedType.D;
  export default alias;
}
