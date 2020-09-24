// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare namespace ಠ_ಠ.clutz.nested {
  function fn ( ) : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare namespace ಠ_ಠ.clutz.nested.fn {
  function inner ( ) : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare module 'goog:nested.fn' {
  import fn = ಠ_ಠ.clutz.nested.fn;
  export default fn;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_fn';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_fn' {
  import fn = ಠ_ಠ.clutz.nested.fn;
  export { fn };
  const __clutz_strip_property: 'fn';
  const __clutz_actual_namespace: 'nested.fn';
}
