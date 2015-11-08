declare namespace ಠ_ಠ.clutz_internal.foo.bar {
  class Baz {
    private noStructuralTyping_: any;
    field : string ;
    avalue : number ;
    equals (b : ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedClass ) : boolean ;
    method (a : string ) : number ;
    static staticMethod (a : string ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.foo.bar.Baz {
  class NestedClass {
    private noStructuralTyping_: any;
  }
  type NestedEnum = number ;
  var NestedEnum : {
    A : ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedEnum ,
    B : ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.bar.Baz'): typeof ಠ_ಠ.clutz_internal.foo.bar.Baz;
}
declare module 'goog:foo.bar.Baz' {
  import alias = ಠ_ಠ.clutz_internal.foo.bar.Baz;
  export default alias;
}
