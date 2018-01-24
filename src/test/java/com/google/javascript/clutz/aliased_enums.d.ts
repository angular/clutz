declare namespace ಠ_ಠ.clutz {
  type module$exports$nested$bar$HahaEnum = module$exports$nested$baz$Enum ;
  const module$exports$nested$bar$HahaEnum : typeof module$exports$nested$baz$Enum ;
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
declare module 'goog:nested.baz.Enum' {
  import alias = ಠ_ಠ.clutz.module$exports$nested$baz$Enum;
  export default alias;
}
