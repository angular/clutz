declare namespace ಠ_ಠ.clutz.foo {
  class A extends A_Instance {
  }
  class A_Instance extends Function {
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'foo.A'): typeof ಠ_ಠ.clutz.foo.A;
}
declare module 'goog:foo.A' {
  import alias = ಠ_ಠ.clutz.foo.A;
  export default alias;
}
