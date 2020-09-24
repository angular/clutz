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
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inner_typedef';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/inner_typedef' {
  import Foo = ಠ_ಠ.clutz.innerTypeDef.Foo;
  export { Foo };
  const __clutz_strip_property: 'Foo';
  const __clutz_actual_namespace: 'innerTypeDef.Foo';
}
