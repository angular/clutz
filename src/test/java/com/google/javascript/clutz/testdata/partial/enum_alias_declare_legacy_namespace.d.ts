// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enum_alias_declare_legacy_namespace.js
declare namespace ಠ_ಠ.clutz.enum_alias2 {
  export import Enum = module$contents$enum_alias2_Enum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enum_alias_declare_legacy_namespace.js
declare module 'goog:enum_alias2' {
  import enum_alias2 = ಠ_ಠ.clutz.enum_alias2;
  export = enum_alias2;
}
//!! This is incorrect as namespace should contain module$contents$enum_alias2_Enum
//!! alias to notVisible.OtherEnum
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enum_alias_declare_legacy_namespace.js
declare namespace ಠ_ಠ.clutz {
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enum_alias_declare_legacy_namespace.js
declare namespace ಠ_ಠ.clutz.module$exports$enum_alias2 {
  export import Enum = ಠ_ಠ.clutz.module$contents$enum_alias2_Enum ;
}
