declare namespace ಠ_ಠ.clutz.union {
  var fn : ( ( ) => string ) | ( ( ) => number ) [] ;
  var nullableUnion : GlobalObject | number ;
  var x : boolean | string ;
}
declare module 'goog:union' {
  import union = ಠ_ಠ.clutz.union;
  export = union;
}
