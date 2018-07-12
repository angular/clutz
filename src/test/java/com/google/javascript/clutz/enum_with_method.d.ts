declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithInlineMethod {
    A ,
    B ,
    C = 42.0 ,
  }
}
declare module 'goog:enums.EnumWithInlineMethod' {
  import EnumWithInlineMethod = ಠ_ಠ.clutz.enums.EnumWithInlineMethod;
  export default EnumWithInlineMethod;
}
declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE = 1.0 ,
    BANANA = 2.0 ,
  }
}
declare module 'goog:enums.EnumWithMethod' {
  import EnumWithMethod = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default EnumWithMethod;
}
