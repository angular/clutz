// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare namespace ಠ_ಠ.clutz.enum_from_enum.Bar.bar {
  enum GoodEnum {
    BAR = 2.0 ,
    FOO = 1.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare module 'goog:enum_from_enum.Bar.bar.GoodEnum' {
  import GoodEnum = ಠ_ಠ.clutz.enum_from_enum.Bar.bar.GoodEnum;
  export default GoodEnum;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_from_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_from_enum' {
  import GoodEnum = ಠ_ಠ.clutz.enum_from_enum.Bar.bar.GoodEnum;
  export { GoodEnum };
  const __clutz_strip_property: 'GoodEnum';
  const __clutz_actual_namespace: 'enum_from_enum.Bar.bar.GoodEnum';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare namespace ಠ_ಠ.clutz.enum_from_enum.Foo.foo {
  export import DeprecatedEnum = enum_from_enum.Bar.bar.GoodEnum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_from_enum.js
declare module 'goog:enum_from_enum.Foo.foo.DeprecatedEnum' {
  import DeprecatedEnum = ಠ_ಠ.clutz.enum_from_enum.Foo.foo.DeprecatedEnum;
  export default DeprecatedEnum;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_from_enum' {
  export {};
  const __clutz_multiple_provides: true;
}
