// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare namespace ಠ_ಠ.clutz.enum_from_enum.Bar.bar {
  enum GoodEnum {
    BAR = 2.0 ,
    FOO = 1.0 ,
  }
}
declare module 'goog:enum_from_enum.Bar.bar.GoodEnum' {
  import GoodEnum = ಠ_ಠ.clutz.enum_from_enum.Bar.bar.GoodEnum;
  export default GoodEnum;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare namespace ಠ_ಠ.clutz.enum_from_enum.Foo.foo {
  export import DeprecatedEnum = enum_from_enum.Bar.bar.GoodEnum ;
}
declare module 'goog:enum_from_enum.Foo.foo.DeprecatedEnum' {
  import DeprecatedEnum = ಠ_ಠ.clutz.enum_from_enum.Foo.foo.DeprecatedEnum;
  export default DeprecatedEnum;
}
