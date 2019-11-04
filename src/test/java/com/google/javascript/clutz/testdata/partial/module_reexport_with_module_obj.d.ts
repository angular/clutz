// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/module_reexport_with_module_obj.js
declare namespace ಠ_ಠ.clutz.module$exports$bare$named$reexport {
  export import Class = ಠ_ಠ.clutz.module$exports$original$module.Class ;
  export import fn = ಠ_ಠ.clutz.module$exports$original$module.fn ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/module_reexport_with_module_obj.js
declare module 'goog:bare.named.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$bare$named$reexport;
  export = reexport;
}
