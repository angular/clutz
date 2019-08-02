declare namespace ಠ_ಠ.clutz.union {
  let fn : ( ( ) => string ) | ( ( ) => number ) [] ;
  let nullableUnion : GlobalObject | number ;
  let x : boolean | string ;
}
declare module 'goog:union' {
  import union = ಠ_ಠ.clutz.union;
  export = union;
}
