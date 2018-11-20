declare namespace ಠ_ಠ.clutz.foo {
  class Klass {
    private noStructuralTyping_: any;
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
