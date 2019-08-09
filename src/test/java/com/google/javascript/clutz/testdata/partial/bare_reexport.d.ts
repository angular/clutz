// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/bare_reexport.js
declare namespace ಠ_ಠ.clutz {
  type module$exports$bare$reexport = ಠ_ಠ.clutz.module$exports$original$module.Class ;
  let module$exports$bare$reexport : typeof ಠ_ಠ.clutz.module$exports$original$module.Class ;
}
declare module 'goog:bare.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$bare$reexport;
  export default reexport;
}
