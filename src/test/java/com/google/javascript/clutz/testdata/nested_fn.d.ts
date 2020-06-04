// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare namespace ಠ_ಠ.clutz.nested {
  function fn ( ) : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare namespace ಠ_ಠ.clutz.nested.fn {
  function inner ( ) : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_fn.js
declare module 'goog:nested.fn' {
  import fn = ಠ_ಠ.clutz.nested.fn;
  export default fn;
}
