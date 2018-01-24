declare namespace ಠ_ಠ.clutz {
  type module$exports$nested_typedef_enum$Bar = { a : string } ;
}
declare module 'goog:nested_typedef_enum.Bar' {
  import alias = ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$nested_typedef_enum$Bar$Baz {
    A ,
  }
}
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import alias = ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar$Baz;
  export default alias;
}
