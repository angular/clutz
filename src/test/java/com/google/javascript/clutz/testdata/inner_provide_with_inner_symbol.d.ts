// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare namespace ಠ_ಠ.clutz.ns {
  function provide ( ) : void ;
}
declare module 'goog:ns.provide' {
  import provide = ಠ_ಠ.clutz.ns.provide;
  export default provide;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare namespace ಠ_ಠ.clutz.ns.provide {
  class C {
    private noStructuralTyping_ns_provide_C : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare namespace ಠ_ಠ.clutz.ns.provide.C {
  class Inner {
    private noStructuralTyping_ns_provide_C_Inner : any;
  }
}
declare module 'goog:ns.provide.C' {
  import C = ಠ_ಠ.clutz.ns.provide.C;
  export default C;
}
