// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/type_union.js
declare namespace ಠ_ಠ.clutz {
  function func (a : ಠ_ಠ.clutz.Foo | ಠ_ಠ.clutz.Bar ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/type_union.js
declare module 'goog:func' {
  import func = ಠ_ಠ.clutz.func;
  export default func;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/type_union';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/type_union' {
  import func = ಠ_ಠ.clutz.func;
  export { func };
  const __clutz_strip_property: 'func';
  const __clutz_actual_namespace: 'func';
}
