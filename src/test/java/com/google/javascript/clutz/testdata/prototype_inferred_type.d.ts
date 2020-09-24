// Generated from src/test/java/com/google/javascript/clutz/testdata/prototype_inferred_type.js
declare namespace ಠ_ಠ.clutz.foo {
  class Klass {
    private noStructuralTyping_foo_Klass : any;
    static foo : any ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/prototype_inferred_type.js
declare module 'goog:foo.Klass' {
  import Klass = ಠ_ಠ.clutz.foo.Klass;
  export default Klass;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/prototype_inferred_type';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/prototype_inferred_type' {
  import Klass = ಠ_ಠ.clutz.foo.Klass;
  export { Klass };
  const __clutz_strip_property: 'Klass';
  const __clutz_actual_namespace: 'foo.Klass';
}
