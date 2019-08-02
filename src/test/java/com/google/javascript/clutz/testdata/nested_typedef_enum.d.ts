declare namespace ಠ_ಠ.clutz.nested_typedef_enum {
  type Bar = { a : string } ;
}
declare module 'goog:nested_typedef_enum.Bar' {
  import Bar = ಠ_ಠ.clutz.nested_typedef_enum.Bar;
  export default Bar;
}
declare namespace ಠ_ಠ.clutz.nested_typedef_enum.Bar {
  enum Baz {
    A = 1.0 ,
  }
}
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import Baz = ಠ_ಠ.clutz.nested_typedef_enum.Bar.Baz;
  export default Baz;
}
