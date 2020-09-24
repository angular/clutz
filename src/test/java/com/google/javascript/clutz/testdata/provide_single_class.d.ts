// Generated from src/test/java/com/google/javascript/clutz/testdata/provide_single_class.js
declare namespace ಠ_ಠ.clutz.foo.bar {
  class Baz {
    private noStructuralTyping_foo_bar_Baz : any;
    field : string ;
    avalue : number ;
    equals (b : ಠ_ಠ.clutz.foo.bar.Baz.NestedClass ) : boolean ;
    method (a : string ) : number ;
    static FUNCTION_PROP_ ( ...a : any [] ) : any ;
    static staticMethod (a : string ) : number ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/provide_single_class.js
declare namespace ಠ_ಠ.clutz.foo.bar.Baz {
  class NestedClass {
    private noStructuralTyping_foo_bar_Baz_NestedClass : any;
  }
  enum NestedEnum {
    B = 1.0 ,
    XD = 2.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/provide_single_class.js
declare module 'goog:foo.bar.Baz' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export default Baz;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/provide_single_class';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/provide_single_class' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export { Baz };
  const __clutz_strip_property: 'Baz';
  const __clutz_actual_namespace: 'foo.bar.Baz';
}
