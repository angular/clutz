declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE ,
    BANANA ,
  }
}
declare namespace goog {
  function require(name: 'enums.EnumWithMethod'): typeof ಠ_ಠ.clutz.enums.EnumWithMethod;
}
declare module 'goog:enums.EnumWithMethod' {
  import alias = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default alias;
}
