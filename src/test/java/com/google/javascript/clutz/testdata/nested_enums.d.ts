// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_enums.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$iterated$nestedenums {
    private noStructuralTyping_module$exports$iterated$nestedenums : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_enums.js
declare namespace ಠ_ಠ.clutz.module$exports$iterated$nestedenums {
  class B {
    private noStructuralTyping_module$exports$iterated$nestedenums_B : any;
  }
  /**
   * Some enum
   */
  enum SomeEnum {
    FIRST = 1.0 ,
    SECOND = 2.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_enums.js
declare namespace ಠ_ಠ.clutz.module$exports$iterated$nestedenums.B {
  /**
   * Another enum
   */
  enum AnotherEnum {
    FIRST = 'first' ,
    SECOND = 'second' ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_enums.js
declare module 'goog:iterated.nestedenums' {
  import nestedenums = ಠ_ಠ.clutz.module$exports$iterated$nestedenums;
  export default nestedenums;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_enums';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_enums' {
  import nestedenums = ಠ_ಠ.clutz.module$exports$iterated$nestedenums;
  export { nestedenums };
  const __clutz_strip_property: 'nestedenums';
  const __clutz_actual_namespace: 'iterated.nestedenums';
}
