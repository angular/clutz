declare namespace ಠ_ಠ.clutz {
  type module$exports$foo$C = ಠ_ಠ.clutz.module$contents$foo$C_C ;
  var module$exports$foo$C : typeof ಠ_ಠ.clutz.module$contents$foo$C_C ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'module$exports$foo$C'): typeof ಠ_ಠ.clutz.module$exports$foo$C;
}
declare module 'goog:foo.C' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$foo$C_C extends module$contents$foo$C_C_Instance {
  }
  class module$contents$foo$C_C_Instance {
    private noStructuralTyping_: any;
    f (a : ಠ_ಠ.clutz.module$contents$foo$C_C.Enum | null ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$contents$foo$C_C {
  type Enum = string ;
  var Enum : {
    A : Enum ,
  };
}
