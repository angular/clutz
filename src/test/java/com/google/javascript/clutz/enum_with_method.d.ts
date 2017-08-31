declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE ,
    BANANA ,
  }
}
declare module 'goog:enums.EnumWithMethod' {
  import alias = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default alias;
}
