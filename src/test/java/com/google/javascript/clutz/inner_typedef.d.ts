declare namespace ಠ_ಠ.clutz {
  class module$exports$innerTypeDef$Foo extends module$exports$innerTypeDef$Foo_Instance {
  }
  class module$exports$innerTypeDef$Foo_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$innerTypeDef {
  export import Foo =  ಠ_ಠ.clutz.module$exports$innerTypeDef$Foo;
}
declare namespace ಠ_ಠ.clutz.module$exports$innerTypeDef$Foo {
  type Bar = { a : string } ;
}
declare namespace ಠ_ಠ.clutz.module$exports$innerTypeDef.Foo {
  export import Bar =  ಠ_ಠ.clutz.module$exports$innerTypeDef$Foo.Bar;
}
declare module 'goog:innerTypeDef.Foo' {
  import alias = ಠ_ಠ.clutz.module$exports$innerTypeDef$Foo;
  export default alias;
}
