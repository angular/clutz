declare namespace ಠ_ಠ.clutz {
  type module$exports$module$Foo = ಠ_ಠ.clutz.module$contents$module$Foo_A ;
  var module$exports$module$Foo : typeof ಠ_ಠ.clutz.module$contents$module$Foo_A ;
}
declare namespace goog {
  function require(name: 'module$exports$module$Foo'): typeof ಠ_ಠ.clutz.module$exports$module$Foo;
}
declare module 'goog:module.Foo' {
  import alias = ಠ_ಠ.clutz.module$exports$module$Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$module$Foo_A extends module$contents$module$Foo_A_Instance {
  }
  class module$contents$module$Foo_A_Instance {
    private noStructuralTyping_: any;
  }
}
