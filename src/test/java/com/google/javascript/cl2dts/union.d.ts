declare namespace ಠ_ಠ.cl2dts_internal.union {
  var x : boolean | string ;
  var nullableUnion : Object | number ;
}
declare module 'goog:union' {
  import alias = ಠ_ಠ.cl2dts_internal.union;
  export = alias;
}
