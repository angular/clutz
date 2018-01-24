declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE = 1 ,
    BANANA = 2 ,
  }
}
declare module 'goog:enums.EnumWithMethod' {
  import alias = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default alias;
}
