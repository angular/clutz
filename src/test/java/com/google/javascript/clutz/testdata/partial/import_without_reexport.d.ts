// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/import_without_reexport.js
declare namespace ಠ_ಠ.clutz.module$exports$import$without$reexport {
  let x : ಠ_ಠ.clutz.type.not.present | null ;
  let y : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/import_without_reexport.js
declare module 'goog:import.without.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$import$without$reexport;
  export = reexport;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/import_without_reexport';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/import_without_reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$import$without$reexport;
  export = reexport;
  const __clutz_actual_namespace: 'import.without.reexport';
}
