// Generated from src/test/java/com/google/javascript/clutz/testdata/forward_declare.js
declare namespace ಠ_ಠ.clutz.forward {
  class A {
    private noStructuralTyping_forward_A : any;
    fn (a : ಠ_ಠ.clutz.forward.D ) : any ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/forward_declare.js
declare module 'goog:forward.A' {
  import A = ಠ_ಠ.clutz.forward.A;
  export default A;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/forward_declare';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/forward_declare' {
  import A = ಠ_ಠ.clutz.forward.A;
  export { A };
  const __clutz_strip_property: 'A';
  const __clutz_actual_namespace: 'forward.A';
}
