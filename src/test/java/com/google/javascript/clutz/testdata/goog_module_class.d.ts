// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_module_class.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$module$Foo {
    private noStructuralTyping_module$exports$module$Foo : any;
    constructor (x : string ,  ...rest : string [] ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_module_class.js
declare module 'goog:module.Foo' {
  import Foo = ಠ_ಠ.clutz.module$exports$module$Foo;
  export default Foo;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/goog_module_class';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/goog_module_class' {
  import Foo = ಠ_ಠ.clutz.module$exports$module$Foo;
  export { Foo };
  const __clutz_strip_property: 'Foo';
  const __clutz_actual_namespace: 'module.Foo';
}
