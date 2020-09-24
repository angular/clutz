// Generated from src/test/java/com/google/javascript/clutz/testdata/nullable.js
declare namespace ಠ_ಠ.clutz.nullable {
  let w : boolean | null ;
  /**
   * Explicitly non-nullable.
   */
  let x : GlobalObject ;
  /**
   * Implicitly nullable.
   */
  let y : GlobalObject | null ;
  /**
   * Explicitly nullable.
   */
  let z : GlobalObject | null ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nullable.js
declare module 'goog:nullable' {
  import nullable = ಠ_ಠ.clutz.nullable;
  export = nullable;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nullable';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nullable' {
  import nullable = ಠ_ಠ.clutz.nullable;
  export = nullable;
  const __clutz_actual_namespace: 'nullable';
}
