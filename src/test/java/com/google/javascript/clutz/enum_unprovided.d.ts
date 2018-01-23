declare namespace ಠ_ಠ.clutz {
  class module$exports$somenamespace$Foo extends module$exports$somenamespace$Foo_Instance {
  }
  class module$exports$somenamespace$Foo_Instance {
    private noStructuralTyping_: any;
    bar : ಠ_ಠ.clutz.module$exports$somenamespace$MyEnum ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$somenamespace {
  export import Foo = ಠ_ಠ.clutz.module$exports$somenamespace$Foo;
}
declare module 'goog:somenamespace.Foo' {
  import alias = ಠ_ಠ.clutz.module$exports$somenamespace$Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$somenamespace$MyEnum = string &{clutzEnumBrand: never} ;
  var module$exports$somenamespace$MyEnum : {
  };
}
declare namespace ಠ_ಠ.clutz.module$exports$somenamespace {
  export import MyEnum = ಠ_ಠ.clutz.module$exports$somenamespace$MyEnum;
}
