declare namespace ಠ_ಠ.cl2dts_internal.typedefs {
  type strOrFunc = string | ( ( ) => string ) ;
  type strToStr = (a : string ) => string ;
}
declare module 'goog:typedefs' {
  import alias = ಠ_ಠ.cl2dts_internal.typedefs;
  export = alias;
}
