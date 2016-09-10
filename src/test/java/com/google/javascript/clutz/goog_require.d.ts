declare namespace ಠ_ಠ.clutz.foo {
  class SimpleClass extends SimpleClass_Instance {
  }
  class SimpleClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'foo.SimpleClass'): typeof ಠ_ಠ.clutz.foo.SimpleClass;
}
declare module 'goog:foo.SimpleClass' {
  import alias = ಠ_ಠ.clutz.foo.SimpleClass;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo.simpleNamespace {
  var a : number ;
}
declare namespace goog {
  function require(name: 'foo.simpleNamespace'): typeof ಠ_ಠ.clutz.foo.simpleNamespace;
}
declare module 'goog:foo.simpleNamespace' {
  import alias = ಠ_ಠ.clutz.foo.simpleNamespace;
  export = alias;
}
