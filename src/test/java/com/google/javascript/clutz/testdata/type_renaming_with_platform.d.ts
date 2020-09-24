// Generated from src/test/java/com/google/javascript/clutz/testdata/type_renaming_with_platform.js
declare namespace ಠ_ಠ.clutz.type_renaming_with_externs {
  let args : IArguments ;
  let arrayLike : ArrayLike < number > ;
  let thenable : PromiseLike < string > ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/type_renaming_with_platform.js
declare module 'goog:type_renaming_with_externs' {
  import type_renaming_with_externs = ಠ_ಠ.clutz.type_renaming_with_externs;
  export = type_renaming_with_externs;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/type_renaming_with_platform';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/type_renaming_with_platform' {
  import type_renaming_with_externs = ಠ_ಠ.clutz.type_renaming_with_externs;
  export = type_renaming_with_externs;
  const __clutz_actual_namespace: 'type_renaming_with_externs';
}
