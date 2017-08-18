declare namespace ಠ_ಠ.clutz.somenamespace {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    bar : ಠ_ಠ.clutz.somenamespace.MyEnum ;
  }
}
declare module 'goog:somenamespace.Foo' {
  import alias = ಠ_ಠ.clutz.somenamespace.Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.somenamespace {
  type MyEnum = string &{brand: never} ;
  var MyEnum : {
  };
}
