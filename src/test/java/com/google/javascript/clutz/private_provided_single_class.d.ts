declare namespace ಠ_ಠ.clutz.foo {
  var PrivateClass : ಠ_ಠ.clutz.PrivateType;
}
declare module 'goog:foo.PrivateClass' {
  import alias = ಠ_ಠ.clutz.foo.PrivateClass;
  export default alias;
}
