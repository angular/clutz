declare namespace ಠ_ಠ.clutz_internal.nested.bar {
  type HahaEnum = number ;
  var HahaEnum : {
    A : HahaEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'nested.bar.HahaEnum'): typeof ಠ_ಠ.clutz_internal.nested.bar.HahaEnum;
}
declare module 'goog:nested.bar.HahaEnum' {
  import alias = ಠ_ಠ.clutz_internal.nested.bar.HahaEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.nested.baz {
  type Enum = number ;
  var Enum : {
    A : Enum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'nested.baz.Enum'): typeof ಠ_ಠ.clutz_internal.nested.baz.Enum;
}
declare module 'goog:nested.baz.Enum' {
  import alias = ಠ_ಠ.clutz_internal.nested.baz.Enum;
  export default alias;
}
