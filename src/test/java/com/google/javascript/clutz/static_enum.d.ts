declare namespace ಠ_ಠ.clutz.foo {
  type C = ಠ_ಠ.clutz.$jscomp.scope.C ;
  var C : typeof ಠ_ಠ.clutz.$jscomp.scope.C ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'foo.C'): typeof ಠ_ಠ.clutz.foo.C;
}
declare module 'goog:foo.C' {
  import alias = ಠ_ಠ.clutz.foo.C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
    f (a : ಠ_ಠ.clutz.$jscomp.scope.C.Enum ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope.C {
  type Enum = string ;
  var Enum : {
    A : Enum ,
  };
}
