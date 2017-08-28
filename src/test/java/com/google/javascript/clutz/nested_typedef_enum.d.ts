declare namespace ಠ_ಠ.clutz.nested_typedef_enum {
  type Bar = { a : string } ;
}
declare module 'goog:nested_typedef_enum.Bar' {
  import alias = ಠ_ಠ.clutz.nested_typedef_enum.Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested_typedef_enum.Bar {
  type Baz = number ;
  var Baz : {
    A : Baz ,
  };
}
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import alias = ಠ_ಠ.clutz.nested_typedef_enum.Bar.Baz;
  export default alias;
}
