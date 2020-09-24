// Generated from src/test/java/com/google/javascript/clutz/testdata/class_extends_array.js
declare namespace ಠ_ಠ.clutz.extend.array {
  class C extends Array< any > {
    private noStructuralTyping_extend_array_C : any;
    constructor ( ) ;
    //!! Emitting [Symbol.iterator] would be wrong here, because one it should
    //!! be just picked up from the Array base.
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/class_extends_array.js
declare module 'goog:extend.array.C' {
  import C = ಠ_ಠ.clutz.extend.array.C;
  export default C;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/class_extends_array';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/class_extends_array' {
  import C = ಠ_ಠ.clutz.extend.array.C;
  export { C };
  const __clutz_strip_property: 'C';
  const __clutz_actual_namespace: 'extend.array.C';
}
