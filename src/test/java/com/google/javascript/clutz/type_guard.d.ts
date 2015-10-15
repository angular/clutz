declare namespace ಠ_ಠ.clutz_internal.a {
  function b (opt_precision ? : number ) : string ;
  function c (s : number ) : string ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'a'): typeof ಠ_ಠ.clutz_internal.a;
}
declare module 'goog:a' {
  import alias = ಠ_ಠ.clutz_internal.a;
  export = alias;
}
