declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$Klass extends module$exports$foo$Klass_Instance {
    /**
     * Crazy pattern, I have only seen it used by jquery.fn = jquery.prototype
     */
    static foo : any ;
  }
  class module$exports$foo$Klass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo {
  export import Klass = ಠ_ಠ.clutz.module$exports$foo$Klass;
}
declare module 'goog:foo.Klass' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$Klass;
  export default alias;
}
