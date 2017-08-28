declare namespace ಠ_ಠ.clutz.nsThis {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
    bar ( ) : ಠ_ಠ.clutz.nsThis.C ;
    foo ( ) : this ;
  }
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
declare module 'goog:nsThis.D' {
  import alias = ಠ_ಠ.clutz.nsThis.D;
  export default alias;
}
