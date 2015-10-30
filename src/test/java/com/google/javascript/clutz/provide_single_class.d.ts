declare namespace ಠ_ಠ.clutz_internal.foo.bar {
  class Baz {
    field : string ;
    avalue : number ;
    equals (b : Baz.NestedClass ) : boolean ;
    method (a : string ) : number ;
    static staticMethod (a : string ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.foo.bar.Baz {
  class NestedClass {
  }
  type NestedEnum = number ;
  var NestedEnum : {
    A : Baz.NestedEnum ,
    B : Baz.NestedEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.bar.Baz'): typeof ಠ_ಠ.clutz_internal.foo.bar.Baz;
}
declare module 'goog:foo.bar.Baz' {
  import alias = ಠ_ಠ.clutz_internal.foo.bar.Baz;
  export default alias;
}
