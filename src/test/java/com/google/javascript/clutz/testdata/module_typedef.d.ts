// Generated from src/test/java/com/google/javascript/clutz/testdata/module_typedef.js
declare namespace ಠ_ಠ.clutz {
  type module$exports$a$module = { a : number } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/module_typedef.js
declare module 'goog:a.module' {
  import module = ಠ_ಠ.clutz.module$exports$a$module;
  export default module;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/module_typedef';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/module_typedef' {
  import module = ಠ_ಠ.clutz.module$exports$a$module;
  export { module };
  const __clutz_strip_property: 'module';
  const __clutz_actual_namespace: 'a.module';
}
