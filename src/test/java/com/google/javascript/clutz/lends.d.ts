declare namespace ಠ_ಠ.clutz_internal.lends {
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'lends'): typeof ಠ_ಠ.clutz_internal.lends;
}
declare module 'goog:lends' {
  import alias = ಠ_ಠ.clutz_internal.lends;
  export = alias;
}
declare namespace ಠ_ಠ.clutz_internal.lends {
  class A {
    a : string ;
    c : boolean ;
    static b : number ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'lends.A'): typeof ಠ_ಠ.clutz_internal.lends.A;
}
declare module 'goog:lends.A' {
  import alias = ಠ_ಠ.clutz_internal.lends.A;
  export default alias;
}
