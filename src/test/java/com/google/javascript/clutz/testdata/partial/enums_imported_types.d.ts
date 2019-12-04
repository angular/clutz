// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enums_imported_types.js
declare namespace ಠ_ಠ.clutz.module$exports$enums$imported$types {
  interface Config {
    //!! TODO(b/145557994): this should include SubEnum
    source ? : null ;
  }
  type SubEnum = ಠ_ಠ.clutz.module$exports$other$enums.ImportedEnum &{clutzEnumBrand: never} ;
  let SubEnum : {
    AUTO : SubEnum ,
    CUSTOM : SubEnum ,
    TESTING : SubEnum ,
  };
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/enums_imported_types.js
declare module 'goog:enums.imported.types' {
  import types = ಠ_ಠ.clutz.module$exports$enums$imported$types;
  export = types;
}
