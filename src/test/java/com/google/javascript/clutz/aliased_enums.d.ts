declare namespace ಠ_ಠ.clutz {
  type module$exports$nested$bar$HahaEnum = module$exports$nested$baz$Enum ;
  const module$exports$nested$bar$HahaEnum : typeof module$exports$nested$baz$Enum ;
}
declare namespace ಠ_ಠ.clutz.module$exports$nested.bar {
  export import HahaEnum =  ಠ_ಠ.clutz.module$exports$nested$bar$HahaEnum;
}
declare namespace ಠ_ಠ.clutz.module$exports$nested$bar {
  export import HahaEnum =  ಠ_ಠ.clutz.module$exports$nested$bar$HahaEnum;
}
declare module 'goog:nested.bar.HahaEnum' {
  import alias = ಠ_ಠ.clutz.module$exports$nested$bar$HahaEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$nested$baz$Enum {
    A ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$nested.baz {
  export import Enum =  ಠ_ಠ.clutz.module$exports$nested$baz$Enum;
}
declare namespace ಠ_ಠ.clutz.module$exports$nested$baz {
  export import Enum =  ಠ_ಠ.clutz.module$exports$nested$baz$Enum;
}
declare module 'goog:nested.baz.Enum' {
  import alias = ಠ_ಠ.clutz.module$exports$nested$baz$Enum;
  export default alias;
}
