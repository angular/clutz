declare namespace ಠ_ಠ.clutz_internal.foo.bar {
  class Baz {
    field : string ;
    avalue : number ;
    equals (b : Baz.NestedClass ) : boolean ;
    method (a : string ) : number ;
    /* not emitting AnotherNestedEnum because it is an enum and it is not provided */
    static staticMethod (a : string ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.bar.Baz'): typeof ಠ_ಠ.clutz_internal.foo.bar.Baz;
}
declare module 'goog:foo.bar.Baz' {
  import alias = ಠ_ಠ.clutz_internal.foo.bar.Baz;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.foo.bar.Baz {
  class NestedClass {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.bar.Baz.NestedClass'): typeof ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedClass;
}
declare module 'goog:foo.bar.Baz.NestedClass' {
  import alias = ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedClass;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.foo.bar.Baz {
  type NestedEnum = number ;
  var NestedEnum : {
    A : NestedEnum ,
    B : NestedEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.bar.Baz.NestedEnum'): typeof ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedEnum;
}
declare module 'goog:foo.bar.Baz.NestedEnum' {
  import alias = ಠ_ಠ.clutz_internal.foo.bar.Baz.NestedEnum;
  export default alias;
}
