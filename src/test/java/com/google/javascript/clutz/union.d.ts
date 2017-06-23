declare namespace ಠ_ಠ.clutz.union {
  var fn : ( ( ) => string ) | ( ( ) => number ) [] ;
  var nullableUnion : GlobalObject | number ;
  var x : boolean | string ;
}
declare namespace goog {
  function require(name: 'union'): typeof ಠ_ಠ.clutz.union;
}
declare module 'goog:union' {
  import alias = ಠ_ಠ.clutz.union;
  export = alias;
}
