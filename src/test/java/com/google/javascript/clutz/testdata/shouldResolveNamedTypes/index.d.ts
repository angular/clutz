// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/index.js
declare namespace ಠ_ಠ.clutz.namedType {
  class A < U > {
    private noStructuralTyping_namedType_A : any;
    fn (a : ಠ_ಠ.clutz.namedType.D < U > ) : any ;
  }
}
declare module 'goog:namedType.A' {
  import A = ಠ_ಠ.clutz.namedType.A;
  export default A;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/dep.js
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T > {
    private noStructuralTyping_namedType_D : any;
  }
}
declare module 'goog:namedType.D' {
  import D = ಠ_ಠ.clutz.namedType.D;
  export default D;
}
