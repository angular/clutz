declare namespace ಠ_ಠ.clutz {
  function module$exports$ns$foo ( ) : boolean ;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$foo {
  enum Enum {
  }
}
declare module 'goog:ns.foo' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$foo;
  export default alias;
}
