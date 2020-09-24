// Generated from src/test/java/com/google/javascript/clutz/testdata/inferred_obj.js
declare namespace ಠ_ಠ.clutz.inferred.nested.obj {
  let nestedObj : { '0123' : number , 'must-be-quoted' : number , quoted : number , regular : number } ;
  let quotedProp : number ;
  let regular : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inferred_obj.js
declare module 'goog:inferred.nested.obj' {
  import obj = ಠ_ಠ.clutz.inferred.nested.obj;
  export = obj;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inferred_obj';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inferred_obj' {
  import obj = ಠ_ಠ.clutz.inferred.nested.obj;
  export = obj;
  const __clutz_actual_namespace: 'inferred.nested.obj';
}
