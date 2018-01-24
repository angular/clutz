declare namespace ಠ_ಠ.clutz.module$exports$typedefs {
  class Aclass extends Aclass_Instance {
  }
  class Aclass_Instance {
    private noStructuralTyping_: any;
  }
  /* skipped emitting type alias typedefs.ArrayLike to avoid collision with existing one in lib.d.ts. */
  var a : ಠ_ಠ.clutz.module$exports$typedefs.Aclass ;
  type aclassalias = ಠ_ಠ.clutz.module$exports$typedefs.Aclass ;
  var arr : ಠ_ಠ.clutz.module$exports$typedefs.arrayA ;
  var arrT : ಠ_ಠ.clutz.module$exports$typedefs.arrayA ;
  type arrayA = ಠ_ಠ.clutz.module$exports$typedefs.Aclass [] ;
  function fn (a : string ) : string ;
  type otherArrayA = ಠ_ಠ.clutz.module$exports$typedefs.Aclass [] ;
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
declare module 'goog:typedefs' {
  import alias = ಠ_ಠ.clutz.module$exports$typedefs;
  export = alias;
}
