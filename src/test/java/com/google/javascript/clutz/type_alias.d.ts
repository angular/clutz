declare namespace ಠ_ಠ.clutz_internal.typedefs {
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
declare module 'goog:typedefs' {
  import alias = ಠ_ಠ.clutz_internal.typedefs;
  export = alias;
}
