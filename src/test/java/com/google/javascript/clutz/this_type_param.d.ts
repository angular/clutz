declare namespace ಠ_ಠ.clutz.nsThis {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
    bar ( ) : ಠ_ಠ.clutz.nsThis.C ;
    foo ( ) : this ;
  }
}
declare namespace goog {
  function require(name: 'nsThis.C'): typeof ಠ_ಠ.clutz.nsThis.C;
}
declare module 'goog:nsThis.C' {
  import alias = ಠ_ಠ.clutz.nsThis.C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nsThis {
  class D extends D_Instance {
  }
  class D_Instance extends ಠ_ಠ.clutz.nsThis.C_Instance {
  }
}
declare namespace goog {
  function require(name: 'nsThis.D'): typeof ಠ_ಠ.clutz.nsThis.D;
}
declare module 'goog:nsThis.D' {
  import alias = ಠ_ಠ.clutz.nsThis.D;
  export default alias;
}
