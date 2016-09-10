declare namespace ಠ_ಠ.clutz.ns {
  function foo ( ) : boolean ;
}
declare namespace ಠ_ಠ.clutz.ns.foo {
  type Enum = number ;
  var Enum : {
  };
}
declare namespace goog {
  function require(name: 'ns.foo'): typeof ಠ_ಠ.clutz.ns.foo;
}
declare module 'goog:ns.foo' {
  import alias = ಠ_ಠ.clutz.ns.foo;
  export default alias;
}
