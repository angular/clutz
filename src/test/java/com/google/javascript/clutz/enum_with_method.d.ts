declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithInlineMethod {
    A ,
    B ,
    C = 42.0 ,
  }
}
declare module 'goog:enums.EnumWithInlineMethod' {
  import alias = ಠ_ಠ.clutz.enums.EnumWithInlineMethod;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE = 1.0 ,
    BANANA = 2.0 ,
  }
}
declare module 'goog:enums.EnumWithMethod' {
  import alias = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default alias;
}
