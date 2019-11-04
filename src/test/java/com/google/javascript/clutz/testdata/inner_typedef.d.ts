// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_typedef.js
declare namespace ಠ_ಠ.clutz.innerTypeDef {
  class Foo {
    private noStructuralTyping_innerTypeDef_Foo : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_typedef.js
declare namespace ಠ_ಠ.clutz.innerTypeDef.Foo {
  type Bar = { a : string } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inner_typedef.js
declare module 'goog:innerTypeDef.Foo' {
  import Foo = ಠ_ಠ.clutz.innerTypeDef.Foo;
  export default Foo;
}
