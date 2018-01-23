declare namespace ಠ_ಠ.clutz {
  function module$exports$a$b (opt_precision ? : number ) : string ;
  function module$exports$a$c (s : number ) : string ;
}
declare namespace ಠ_ಠ.clutz.module$exports$a {
  export import b = ಠ_ಠ.clutz.module$exports$a$b;
}
declare namespace ಠ_ಠ.clutz.module$exports$a {
  export import c = ಠ_ಠ.clutz.module$exports$a$c;
}
declare module 'goog:a' {
  import alias = ಠ_ಠ.clutz.module$exports$a;
  export = alias;
}
