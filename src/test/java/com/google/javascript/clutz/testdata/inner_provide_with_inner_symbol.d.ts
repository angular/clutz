// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare namespace ಠ_ಠ.clutz.ns {
  function provide ( ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare module 'goog:ns.provide' {
  import provide = ಠ_ಠ.clutz.ns.provide;
  export default provide;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol' {
  import provide = ಠ_ಠ.clutz.ns.provide;
  export { provide };
  const __clutz_strip_property: 'provide';
  const __clutz_actual_namespace: 'ns.provide';
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
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_provide_with_inner_symbol.js
declare module 'goog:ns.provide.C' {
  import C = ಠ_ಠ.clutz.ns.provide.C;
  export default C;
}
