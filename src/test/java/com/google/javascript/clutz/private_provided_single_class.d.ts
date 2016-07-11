declare namespace ಠ_ಠ.clutz.foo {
  class PrivateClass extends PrivateClass_Instance {
  }
  class PrivateClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'foo.PrivateClass'): typeof ಠ_ಠ.clutz.foo.PrivateClass;
}
declare module 'goog:foo.PrivateClass' {
  import alias = ಠ_ಠ.clutz.foo.PrivateClass;
  export default alias;
}
