// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_with_method.js
declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithInlineMethod {
    A ,
    B ,
    C = 42.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_with_method.js
declare module 'goog:enums.EnumWithInlineMethod' {
  import EnumWithInlineMethod = ಠ_ಠ.clutz.enums.EnumWithInlineMethod;
  export default EnumWithInlineMethod;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_with_method';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_with_method' {
  import EnumWithInlineMethod = ಠ_ಠ.clutz.enums.EnumWithInlineMethod;
  export { EnumWithInlineMethod };
  const __clutz_strip_property: 'EnumWithInlineMethod';
  const __clutz_actual_namespace: 'enums.EnumWithInlineMethod';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_with_method.js
declare namespace ಠ_ಠ.clutz.enums {
  enum EnumWithMethod {
    APPLE = 1.0 ,
    BANANA = 2.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_with_method.js
declare namespace ಠ_ಠ.clutz.enums.EnumWithMethod {
  function getColor ( ) : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_with_method.js
declare module 'goog:enums.EnumWithMethod' {
  import EnumWithMethod = ಠ_ಠ.clutz.enums.EnumWithMethod;
  export default EnumWithMethod;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_with_method' {
  export {};
  const __clutz_multiple_provides: true;
}
