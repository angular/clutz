declare namespace ಠ_ಠ.clutz {
  type module$exports$nested_typedef_enum$Bar = { a : string } ;
}
declare namespace ಠ_ಠ.clutz.module$exports$nested_typedef_enum {
  export import Bar =  ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar;
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
declare namespace ಠ_ಠ.clutz.module$exports$nested_typedef_enum.Bar {
  export import Baz =  ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar$Baz;
}
declare namespace ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar {
  export import Baz =  ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar$Baz;
}
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import alias = ಠ_ಠ.clutz.module$exports$nested_typedef_enum$Bar$Baz;
  export default alias;
}
