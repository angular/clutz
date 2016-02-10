declare namespace ಠ_ಠ.clutz.module {
  type Foo = ಠ_ಠ.clutz.$jscomp.scope.A ;
  var Foo : typeof ಠ_ಠ.clutz.$jscomp.scope.A ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'module.Foo'): typeof ಠ_ಠ.clutz.module.Foo;
}
declare module 'goog:module.Foo' {
  import alias = ಠ_ಠ.clutz.module.Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
  }
}
