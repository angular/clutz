// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/module_reexport_with_module_obj.js
declare namespace ಠ_ಠ.clutz.module$exports$bare$named$reexport {
  type Class = ಠ_ಠ.clutz.module$exports$original$module.Class ;
  let Class : typeof ಠ_ಠ.clutz.module$exports$original$module.Class ;
  type fn = ಠ_ಠ.clutz.module$exports$original$module.fn ;
  let fn : typeof ಠ_ಠ.clutz.module$exports$original$module.fn ;
}
declare module 'goog:bare.named.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$bare$named$reexport;
  export = reexport;
}
