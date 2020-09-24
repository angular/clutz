// Generated from src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided.js
declare namespace ಠ_ಠ.clutz.used.not.provided {
  let a : ಠ_ಠ.clutz.used.not.provided.C ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided.js
declare module 'goog:used.not.provided.a' {
  import a = ಠ_ಠ.clutz.used.not.provided.a;
  export default a;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided' {
  import a = ಠ_ಠ.clutz.used.not.provided.a;
  export { a };
  const __clutz_strip_property: 'a';
  const __clutz_actual_namespace: 'used.not.provided.a';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided.js
declare namespace ಠ_ಠ.clutz.used.not.provided {
  class C implements ಠ_ಠ.clutz.used.not.provided.I < number > {
    private noStructuralTyping_used_not_provided_C : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/type_used_but_not_provided.js
declare namespace ಠ_ಠ.clutz.used.not.provided {
  interface I < T = any > {
  }
}
