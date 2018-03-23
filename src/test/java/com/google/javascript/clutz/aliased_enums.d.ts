declare namespace ಠ_ಠ.clutz.nested.bar {
  type HahaEnum = nested.baz.Enum ;
  const HahaEnum : typeof nested.baz.Enum ;
}
declare module 'goog:nested.bar.HahaEnum' {
  import alias = ಠ_ಠ.clutz.nested.bar.HahaEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested.baz {
  enum Enum {
    A = 5.0 ,
  }
}
declare module 'goog:nested.baz.Enum' {
  import alias = ಠ_ಠ.clutz.nested.baz.Enum;
  export default alias;
}
