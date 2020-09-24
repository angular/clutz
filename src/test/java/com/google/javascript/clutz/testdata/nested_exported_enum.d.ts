// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_exported_enum.js
declare namespace ಠ_ಠ.clutz.module$exports$nested$exported$enums {
  enum A {
    A1 = 'a1' ,
  }
  let B : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_exported_enum.js
declare module 'goog:nested.exported.enums' {
  import enums = ಠ_ಠ.clutz.module$exports$nested$exported$enums;
  export = enums;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_exported_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_exported_enum' {
  import enums = ಠ_ಠ.clutz.module$exports$nested$exported$enums;
  export = enums;
  const __clutz_actual_namespace: 'nested.exported.enums';
}
