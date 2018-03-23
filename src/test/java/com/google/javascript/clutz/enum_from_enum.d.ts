declare namespace ಠ_ಠ.clutz.enum_from_enum.Bar.bar {
  enum GoodEnum {
    BAR = 2.0 ,
    FOO = 1.0 ,
  }
}
declare module 'goog:enum_from_enum.Bar.bar.GoodEnum' {
  import alias = ಠ_ಠ.clutz.enum_from_enum.Bar.bar.GoodEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.enum_from_enum.Foo.foo {
  type DeprecatedEnum = enum_from_enum.Bar.bar.GoodEnum ;
  const DeprecatedEnum : typeof enum_from_enum.Bar.bar.GoodEnum ;
}
declare module 'goog:enum_from_enum.Foo.foo.DeprecatedEnum' {
  import alias = ಠ_ಠ.clutz.enum_from_enum.Foo.foo.DeprecatedEnum;
  export default alias;
}
