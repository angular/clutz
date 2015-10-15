declare namespace ಠ_ಠ.clutz_internal.typedefs {
  var a : number ;
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'typedefs'): typeof ಠ_ಠ.clutz_internal.typedefs;
}
declare module 'goog:typedefs' {
  import alias = ಠ_ಠ.clutz_internal.typedefs;
  export = alias;
}
