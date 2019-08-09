// Generated from src/test/java/com/google/javascript/clutz/testdata/prototype_inferred_type.js
declare namespace ಠ_ಠ.clutz.foo {
  class Klass {
    private noStructuralTyping_foo_Klass : any;
    /**
     * Crazy pattern, I have only seen it used by jquery.fn = jquery.prototype
     */
    static foo : any ;
  }
}
declare module 'goog:foo.Klass' {
  import Klass = ಠ_ಠ.clutz.foo.Klass;
  export default Klass;
}
