declare module ಠ_ಠ.cl2dts_internal.foo.bar.Baz {
  export default class {
    field : string ;
    method (a : string ) : number ;
    static staticMethod (a : string ) : number ;
  }
}
declare module 'goog:foo.bar.Baz' {
  export = ಠ_ಠ.cl2dts_internal.foo.bar.Baz;
}
