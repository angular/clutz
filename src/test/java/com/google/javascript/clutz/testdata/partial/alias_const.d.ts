// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/alias_const.js
declare namespace ಠ_ಠ.clutz {
  export import module$exports$alias_const = ಠ_ಠ.clutz.module$exports$not_visible$OtherType ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/alias_const.js
declare module 'goog:alias_const' {
  import alias_const = ಠ_ಠ.clutz.module$exports$alias_const;
  export default alias_const;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/alias_const';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/alias_const' {
  import alias_const = ಠ_ಠ.clutz.module$exports$alias_const;
  export { alias_const };
  const __clutz_strip_property: 'alias_const';
  const __clutz_actual_namespace: 'alias_const';
}
