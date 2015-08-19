declare namespace ಠ_ಠ.cl2dts_internal.foo.bar {
  class Baz {
    field : string ;
    method (a : string ) : number ;
    static staticMethod (a : string ) : number ;
  }
}
declare module 'goog:foo.bar.Baz' {
  import alias = ಠ_ಠ.cl2dts_internal.foo.bar.Baz;
  export default alias;
}
