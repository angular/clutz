// Generated from src/test/java/com/google/javascript/clutz/testdata/export_reexport.js
declare namespace ಠ_ಠ.clutz.module$exports$exports$reexport {
  let A : string ;
  let TypedExportLocal : string ;
  let TypedReexport : string ;
  let UntypedExportLocal : string ;
  let UntypedReexport : string ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/export_reexport.js
declare module 'goog:exports.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$exports$reexport;
  export = reexport;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/export_reexport';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/export_reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$exports$reexport;
  export = reexport;
  const __clutz_actual_namespace: 'exports.reexport';
}
