// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/bare_reexport.js
declare namespace ಠ_ಠ.clutz {
  export import module$exports$bare$reexport = ಠ_ಠ.clutz.module$exports$original$module.Class ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/bare_reexport.js
declare module 'goog:bare.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$bare$reexport;
  export default reexport;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/bare_reexport';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/bare_reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$bare$reexport;
  export { reexport };
  const __clutz_strip_property: 'reexport';
  const __clutz_actual_namespace: 'bare.reexport';
}
