// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespace_unprovided.js
declare namespace ಠ_ಠ.clutz.some.ns {
  let inner : { A : number , B : number } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespace_unprovided.js
declare module 'goog:some.ns' {
  import ns = ಠ_ಠ.clutz.some.ns;
  export = ns;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespace_unprovided';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespace_unprovided' {
  import ns = ಠ_ಠ.clutz.some.ns;
  export = ns;
  const __clutz_actual_namespace: 'some.ns';
}
