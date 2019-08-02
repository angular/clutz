declare namespace ಠ_ಠ.clutz.somenamespace {
  class Foo {
    private noStructuralTyping_somenamespace_Foo : any;
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
