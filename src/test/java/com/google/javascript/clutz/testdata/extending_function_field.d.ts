// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare namespace ಠ_ಠ.clutz.a {
  function messesWithB (b : ಠ_ಠ.clutz.ns.B ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare module 'goog:a.messesWithB' {
  import messesWithB = ಠ_ಠ.clutz.a.messesWithB;
  export default messesWithB;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extending_function_field';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extending_function_field' {
  import messesWithB = ಠ_ಠ.clutz.a.messesWithB;
  export { messesWithB };
  const __clutz_strip_property: 'messesWithB';
  const __clutz_actual_namespace: 'a.messesWithB';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare namespace ಠ_ಠ.clutz.ns {
  class A {
    private noStructuralTyping_ns_A : any;
    fn ( ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare module 'goog:ns.A' {
  import A = ಠ_ಠ.clutz.ns.A;
  export default A;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extending_function_field' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare namespace ಠ_ಠ.clutz.ns {
  class B extends ಠ_ಠ.clutz.ns.A {
    private noStructuralTyping_ns_B : any;
    fn ( ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extending_function_field.js
declare module 'goog:ns.B' {
  import B = ಠ_ಠ.clutz.ns.B;
  export default B;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/extending_function_field' {
  export {};
  const __clutz_multiple_provides: true;
}
