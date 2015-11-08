declare namespace ಠ_ಠ.clutz_internal.nested.bar {
  type Enum = number ;
  var Enum : {
    A : ಠ_ಠ.clutz_internal.nested.baz.Enum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'nested.bar.Enum'): typeof ಠ_ಠ.clutz_internal.nested.bar.Enum;
}
declare module 'goog:nested.bar.Enum' {
  import alias = ಠ_ಠ.clutz_internal.nested.bar.Enum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.nested.baz {
  type Enum = number ;
  var Enum : {
    A : ಠ_ಠ.clutz_internal.nested.baz.Enum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'nested.baz.Enum'): typeof ಠ_ಠ.clutz_internal.nested.baz.Enum;
}
declare module 'goog:nested.baz.Enum' {
  import alias = ಠ_ಠ.clutz_internal.nested.baz.Enum;
  export default alias;
}
