// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_unprovided.js
declare namespace ಠ_ಠ.clutz.somenamespace {
  class Foo {
    private noStructuralTyping_somenamespace_Foo : any;
    bar : ಠ_ಠ.clutz.somenamespace.MyEnum ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_unprovided.js
declare module 'goog:somenamespace.Foo' {
  import Foo = ಠ_ಠ.clutz.somenamespace.Foo;
  export default Foo;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_unprovided';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_unprovided' {
  import Foo = ಠ_ಠ.clutz.somenamespace.Foo;
  export { Foo };
  const __clutz_strip_property: 'Foo';
  const __clutz_actual_namespace: 'somenamespace.Foo';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_unprovided.js
declare namespace ಠ_ಠ.clutz.somenamespace {
  enum MyEnum {
  }
}
