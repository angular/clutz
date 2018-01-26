declare namespace ಠ_ಠ.clutz {
  enum module$exports$enums$EnumWithMethod {
    APPLE ,
    BANANA ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$enums {
  export import EnumWithMethod =  ಠ_ಠ.clutz.module$exports$enums$EnumWithMethod;
}
declare module 'goog:enums.EnumWithMethod' {
  import alias = ಠ_ಠ.clutz.module$exports$enums$EnumWithMethod;
  export default alias;
}
