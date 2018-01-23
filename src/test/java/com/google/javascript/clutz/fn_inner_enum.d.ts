declare namespace ಠ_ಠ.clutz {
  function module$exports$ns$foo ( ) : boolean ;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns {
  export import foo = ಠ_ಠ.clutz.module$exports$ns$foo;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$ns$foo$Enum {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$ns.foo {
  export import Enum = ಠ_ಠ.clutz.module$exports$ns$foo$Enum;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$foo {
  export import Enum = ಠ_ಠ.clutz.module$exports$ns$foo$Enum;
}
declare module 'goog:ns.foo' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$foo;
  export default alias;
}
