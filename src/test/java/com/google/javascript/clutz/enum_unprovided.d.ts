declare namespace ಠ_ಠ.clutz.somenamespace {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    bar : ಠ_ಠ.clutz.somenamespace.MyEnum ;
  }
}
declare namespace goog {
  function require(name: 'somenamespace.Foo'): typeof ಠ_ಠ.clutz.somenamespace.Foo;
}
declare module 'goog:somenamespace.Foo' {
  import alias = ಠ_ಠ.clutz.somenamespace.Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.somenamespace {
  type MyEnum = string ;
  var MyEnum : {
  };
}
