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
declare module 'goog:iterated.nestedenums' {
  import nestedenums = ಠ_ಠ.clutz.module$exports$iterated$nestedenums;
  export default nestedenums;
}
