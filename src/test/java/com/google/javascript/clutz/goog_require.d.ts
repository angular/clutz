declare namespace ಠ_ಠ.clutz_internal.foo {
  class SimpleClass {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.SimpleClass'): typeof ಠ_ಠ.clutz_internal.foo.SimpleClass;
}
declare module 'goog:foo.SimpleClass' {
  import alias = ಠ_ಠ.clutz_internal.foo.SimpleClass;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.foo.simpleNamespace {
  var a : number ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'foo.simpleNamespace'): typeof ಠ_ಠ.clutz_internal.foo.simpleNamespace;
}
declare module 'goog:foo.simpleNamespace' {
  import alias = ಠ_ಠ.clutz_internal.foo.simpleNamespace;
  export = alias;
}
