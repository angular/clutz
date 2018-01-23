declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$A extends module$exports$foo$A_Instance {
  }
  class module$exports$foo$A_Instance extends Function {
    constructor ( ) ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo {
  export import A = ಠ_ಠ.clutz.module$exports$foo$A;
}
declare module 'goog:foo.A' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$A;
  export default alias;
}
