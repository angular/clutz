// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$nested$typedef$mod {
    private noStructuralTyping_module$exports$nested$typedef$mod : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_module.js
declare namespace ಠ_ಠ.clutz.module$exports$nested$typedef$mod {
  type T = { a : string } ;
}
declare module 'goog:nested.typedef.mod' {
  import mod = ಠ_ಠ.clutz.module$exports$nested$typedef$mod;
  export default mod;
}
