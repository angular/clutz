declare namespace ಠ_ಠ.clutz.nested_typedef_enum {
  type Bar = { a : string } ;
}
declare module 'goog:nested_typedef_enum.Bar' {
  import alias = ಠ_ಠ.clutz.nested_typedef_enum.Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested_typedef_enum.Bar {
  enum Baz {
    A = 1.0 ,
  }
}
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import alias = ಠ_ಠ.clutz.nested_typedef_enum.Bar.Baz;
  export default alias;
}
