// Generated from src/test/java/com/google/javascript/clutz/testdata/all_optional_type.js
declare namespace ಠ_ಠ.clutz.module$exports$collapsed$union {
  function fn (arg : { opt_some ? : string } | Function | null ) : void ;
  function fn2 (arg : { opt_some ? : string } | { other : string } ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/all_optional_type.js
declare module 'goog:collapsed.union' {
  import union = ಠ_ಠ.clutz.module$exports$collapsed$union;
  export = union;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/all_optional_type';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/all_optional_type' {
  import union = ಠ_ಠ.clutz.module$exports$collapsed$union;
  export = union;
  const __clutz_actual_namespace: 'collapsed.union';
}
