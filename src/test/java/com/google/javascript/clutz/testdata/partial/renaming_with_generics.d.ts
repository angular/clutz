// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/renaming_with_generics.js
declare namespace ಠ_ಠ.clutz.module$exports$renaming$with$generics {
  let x : ಠ_ಠ.clutz.angular.IPromise < ಠ_ಠ.clutz.module$exports$other$module > | null ;
  let y : ಠ_ಠ.clutz.angular.IPromise < ಠ_ಠ.clutz.module$exports$other$module$destruct.D > | null ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/renaming_with_generics.js
declare module 'goog:renaming.with.generics' {
  import generics = ಠ_ಠ.clutz.module$exports$renaming$with$generics;
  export = generics;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/renaming_with_generics';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/renaming_with_generics' {
  import generics = ಠ_ಠ.clutz.module$exports$renaming$with$generics;
  export = generics;
  const __clutz_actual_namespace: 'renaming.with.generics';
}
