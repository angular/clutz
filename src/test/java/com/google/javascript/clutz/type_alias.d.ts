declare namespace ಠ_ಠ.clutz.typedefs {
  /* skipped emitting type alias typedefs.ArrayLike to avoid collision with existing one in lib.d.ts. */
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
declare module 'goog:typedefs' {
  import alias = ಠ_ಠ.clutz.typedefs;
  export = alias;
}
