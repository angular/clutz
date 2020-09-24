// Generated from src/test/java/com/google/javascript/clutz/testdata/class_alias.js
declare namespace ಠ_ಠ.clutz.alias {
  export import A = ಠ_ಠ.clutz.original.A ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/class_alias.js
declare module 'goog:alias.A' {
  import A = ಠ_ಠ.clutz.alias.A;
  export default A;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/class_alias';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/class_alias' {
  import A = ಠ_ಠ.clutz.alias.A;
  export { A };
  const __clutz_strip_property: 'A';
  const __clutz_actual_namespace: 'alias.A';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/class_alias.js
declare namespace ಠ_ಠ.clutz.original {
  class A {
    private noStructuralTyping_original_A : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/class_alias.js
declare namespace ಠ_ಠ.clutz.original.A {
  class InnerC {
    private noStructuralTyping_original_A_InnerC : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/class_alias.js
declare module 'goog:original.A' {
  import A = ಠ_ಠ.clutz.original.A;
  export default A;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/class_alias' {
  export {};
  const __clutz_multiple_provides: true;
}
