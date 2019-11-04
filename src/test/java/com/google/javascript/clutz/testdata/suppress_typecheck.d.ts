// Generated from src/test/java/com/google/javascript/clutz/testdata/suppress_typecheck.js
declare namespace ಠ_ಠ.clutz.suppress {
  class A {
    private noStructuralTyping_suppress_A : any;
    foo ( ) : number ;
  }
  class B extends ಠ_ಠ.clutz.suppress.A {
    private noStructuralTyping_suppress_B : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/suppress_typecheck.js
declare module 'goog:suppress' {
  import suppress = ಠ_ಠ.clutz.suppress;
  export = suppress;
}
