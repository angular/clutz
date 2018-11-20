declare namespace ಠ_ಠ.clutz.innerTypeDef {
  class Foo {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.innerTypeDef.Foo {
  type Bar = { a : string } ;
}
declare module 'goog:innerTypeDef.Foo' {
  import Foo = ಠ_ಠ.clutz.innerTypeDef.Foo;
  export default Foo;
}
