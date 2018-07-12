declare namespace ಠ_ಠ.clutz.somenamespace {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    bar : ಠ_ಠ.clutz.somenamespace.MyEnum ;
  }
}
declare module 'goog:somenamespace.Foo' {
  import Foo = ಠ_ಠ.clutz.somenamespace.Foo;
  export default Foo;
}
declare namespace ಠ_ಠ.clutz.somenamespace {
  enum MyEnum {
  }
}
