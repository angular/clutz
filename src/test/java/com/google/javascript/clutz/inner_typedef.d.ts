declare namespace ಠ_ಠ.clutz.innerTypeDef {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.innerTypeDef.Foo {
  type Bar = { a : string } ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'innerTypeDef.Foo'): typeof ಠ_ಠ.clutz.innerTypeDef.Foo;
}
declare module 'goog:innerTypeDef.Foo' {
  import alias = ಠ_ಠ.clutz.innerTypeDef.Foo;
  export default alias;
}
