declare namespace ಠ_ಠ.clutz.ns {
  function foo ( ) : boolean ;
}
declare namespace ಠ_ಠ.clutz.ns.foo {
  type Enum = number ;
  var Enum : {
  };
}
declare module 'goog:ns.foo' {
  import alias = ಠ_ಠ.clutz.ns.foo;
  export default alias;
}
