// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$nested$typedef$mod {
    private noStructuralTyping_module$exports$nested$typedef$mod : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module.js
declare namespace ಠ_ಠ.clutz.module$exports$nested$typedef$mod {
  type T = { a : string } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module.js
declare module 'goog:nested.typedef.mod' {
  import mod = ಠ_ಠ.clutz.module$exports$nested$typedef$mod;
  export default mod;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module' {
  import mod = ಠ_ಠ.clutz.module$exports$nested$typedef$mod;
  export { mod };
  const __clutz_strip_property: 'mod';
  const __clutz_actual_namespace: 'nested.typedef.mod';
}
