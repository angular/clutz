// Generated from src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns.js
declare namespace ಠ_ಠ.clutz {
  function fn ( ) : ಠ_ಠ.clutz.fn.String ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns.js
declare module 'goog:fn' {
  import fn = ಠ_ಠ.clutz.fn;
  export default fn;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns' {
  import fn = ಠ_ಠ.clutz.fn;
  export { fn };
  const __clutz_strip_property: 'fn';
  const __clutz_actual_namespace: 'fn';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns.js
declare namespace ಠ_ಠ.clutz.fn {
  class String {
    private noStructuralTyping_fn_String : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/refer_from_default_ns.js
declare module 'goog:fn.String' {
  import String = ಠ_ಠ.clutz.fn.String;
  export default String;
}
