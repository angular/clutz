// Generated from src/test/java/com/google/javascript/clutz/testdata/type_alias.js
declare namespace ಠ_ಠ.clutz.typedefs {
  class Aclass {
    private noStructuralTyping_typedefs_Aclass : any;
  }
  /* skipped emitting type alias typedefs.ArrayLike to avoid collision with existing one in lib.d.ts. */
  let a : ಠ_ಠ.clutz.typedefs.Aclass ;
  type aclassalias = ಠ_ಠ.clutz.typedefs.Aclass ;
  let arr : ಠ_ಠ.clutz.typedefs.Aclass [] ;
  let arrT : ಠ_ಠ.clutz.typedefs.arrayA ;
  type arrayA = ಠ_ಠ.clutz.typedefs.Aclass [] ;
  //!! TODO(rado): fn should use the strToStr typedef.
  function fn (a : string ) : string ;
  type otherArrayA = ಠ_ಠ.clutz.typedefs.Aclass [] ;
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/type_alias.js
declare module 'goog:typedefs' {
  import typedefs = ಠ_ಠ.clutz.typedefs;
  export = typedefs;
}
