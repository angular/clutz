declare namespace ಠ_ಠ.clutz {
  var module$exports$union$fn : ( ( ) => string ) | ( ( ) => number ) [] ;
  var module$exports$union$nullableUnion : GlobalObject | number ;
  var module$exports$union$x : boolean | string ;
}
declare namespace ಠ_ಠ.clutz.module$exports$union {
  export import fn = ಠ_ಠ.clutz.module$exports$union$fn;
}
declare namespace ಠ_ಠ.clutz.module$exports$union {
  export import nullableUnion = ಠ_ಠ.clutz.module$exports$union$nullableUnion;
}
declare namespace ಠ_ಠ.clutz.module$exports$union {
  export import x = ಠ_ಠ.clutz.module$exports$union$x;
}
declare module 'goog:union' {
  import alias = ಠ_ಠ.clutz.module$exports$union;
  export = alias;
}
