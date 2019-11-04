// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/missing_base_union.js
declare namespace ಠ_ಠ.clutz.module$exports$missing$base$union {
  //!! The double extends here is a bug too.
  interface Derived extends ಠ_ಠ.clutz.module$exports$some$base.Base extends ಠ_ಠ.clutz.module$exports$some$base.Base {
    someField ? : string ;
  }
  function fn (a : ಠ_ಠ.clutz.module$exports$missing$base$union.Derived , b : ಠ_ಠ.clutz.module$exports$missing$base$union.Derived | null , c ? : ಠ_ಠ.clutz.module$exports$missing$base$union.Derived ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/missing_base_union.js
declare module 'goog:missing.base.union' {
  import union = ಠ_ಠ.clutz.module$exports$missing$base$union;
  export = union;
}
