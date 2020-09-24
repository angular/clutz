// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.globalNs.generic {
  let type : Map < string , string > ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare module 'goog:globalNs.generic.type' {
  import type = ಠ_ಠ.clutz.globalNs.generic.type;
  export default type;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type' {
  import type = ಠ_ಠ.clutz.globalNs.generic.type;
  export { type };
  const __clutz_strip_property: 'type';
  const __clutz_actual_namespace: 'globalNs.generic.type';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.globalNs.non.generic {
  let type : Map ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare module 'goog:globalNs.non.generic.type' {
  import type = ಠ_ಠ.clutz.globalNs.non.generic.type;
  export default type;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.nested.generic {
  let type : ಠ_ಠ.clutz.SomeType < Map < string , string > > ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare module 'goog:nested.generic.type' {
  import type = ಠ_ಠ.clutz.nested.generic.type;
  export default type;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type' {
  export {};
  const __clutz_multiple_provides: true;
}
