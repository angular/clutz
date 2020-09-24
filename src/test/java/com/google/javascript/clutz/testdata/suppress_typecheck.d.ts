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
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/suppress_typecheck';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/suppress_typecheck' {
  import suppress = ಠ_ಠ.clutz.suppress;
  export = suppress;
  const __clutz_actual_namespace: 'suppress';
}
