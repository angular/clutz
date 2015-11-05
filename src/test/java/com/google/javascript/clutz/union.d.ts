declare namespace ಠ_ಠ.clutz_internal.union {
  var fn : ( ( ) => string ) | ( ( ) => number ) [] ;
  var nullableUnion : Object | number ;
  var x : boolean | string ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'union'): typeof ಠ_ಠ.clutz_internal.union;
}
declare module 'goog:union' {
  import alias = ಠ_ಠ.clutz_internal.union;
  export = alias;
}
