// Generated from src/test/java/com/google/javascript/clutz/testdata/extends_function_with_platform.js
declare namespace ಠ_ಠ.clutz.foo {
  class A extends Function {
    private noStructuralTyping_foo_A : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extends_function_with_platform.js
declare module 'goog:foo.A' {
  import A = ಠ_ಠ.clutz.foo.A;
  export default A;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extends_function_with_platform';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extends_function_with_platform' {
  import A = ಠ_ಠ.clutz.foo.A;
  export { A };
  const __clutz_strip_property: 'A';
  const __clutz_actual_namespace: 'foo.A';
}
