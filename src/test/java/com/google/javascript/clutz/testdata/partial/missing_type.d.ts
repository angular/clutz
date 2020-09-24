// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/missing_type.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$type {
  let x : ಠ_ಠ.clutz.Missing ;
  let xWithGenerics : ಠ_ಠ.clutz.goog.missing.map < string , number > ;
  let xWithMissingGenerics : ಠ_ಠ.clutz.goog.missing.map < ಠ_ಠ.clutz.mod.ref.A , ಠ_ಠ.clutz.mod.ref.B < ಠ_ಠ.clutz.mod.ref.C > > ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/missing_type.js
declare module 'goog:missing.type' {
  import type = ಠ_ಠ.clutz.module$exports$missing$type;
  export = type;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/missing_type';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/missing_type' {
  import type = ಠ_ಠ.clutz.module$exports$missing$type;
  export = type;
  const __clutz_actual_namespace: 'missing.type';
}
