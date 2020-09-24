// Generated from src/test/java/com/google/javascript/clutz/testdata/static_enum.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$C {
    private noStructuralTyping_module$exports$foo$C : any;
    f (a : ಠ_ಠ.clutz.module$exports$foo$C.Enum ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_enum.js
declare namespace ಠ_ಠ.clutz.module$exports$foo$C {
  /**
   * Test
   */
  enum Enum {
    A = '' ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_enum.js
declare module 'goog:foo.C' {
  import C = ಠ_ಠ.clutz.module$exports$foo$C;
  export default C;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/static_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/static_enum' {
  import C = ಠ_ಠ.clutz.module$exports$foo$C;
  export { C };
  const __clutz_strip_property: 'C';
  const __clutz_actual_namespace: 'foo.C';
}
