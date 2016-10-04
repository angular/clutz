declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$C extends module$exports$foo$C_Instance {
  }
  class module$exports$foo$C_Instance {
    private noStructuralTyping_: any;
    f (a : ಠ_ಠ.clutz.module$exports$foo$C.Enum ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$C {
  type Enum = string ;
  var Enum : {
    A : Enum ,
  };
}
declare namespace goog {
  function require(name: 'module$exports$foo$C'): typeof ಠ_ಠ.clutz.module$exports$foo$C;
}
declare module 'goog:foo.C' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$C;
  export default alias;
}
