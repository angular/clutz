declare namespace ಠ_ಠ.clutz.a {
  function b (opt_precision ? : number ) : string ;
  function c (s : number ) : string ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'a'): typeof ಠ_ಠ.clutz.a;
}
declare module 'goog:a' {
  import alias = ಠ_ಠ.clutz.a;
  export = alias;
}
