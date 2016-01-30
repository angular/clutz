declare namespace ಠ_ಠ.clutz.foo {
  class Bar extends Bar_Instance {
  }
  class Bar_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'foo.Bar'): typeof ಠ_ಠ.clutz.foo.Bar;
}
declare module 'goog:foo.Bar' {
  import alias = ಠ_ಠ.clutz.foo.Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  var boom : ಠ_ಠ.clutz.$jscomp.scope.Bar ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'foo.boom'): typeof ಠ_ಠ.clutz.foo.boom;
}
declare module 'goog:foo.boom' {
  import alias = ಠ_ಠ.clutz.foo.boom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  class Bar extends Bar_Instance {
  }
  class Bar_Instance {
    private noStructuralTyping_: any;
  }
}
