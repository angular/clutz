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
  import C = ಠ_ಠ.clutz.nsThis.C;
  export default C;
}
declare namespace ಠ_ಠ.clutz.nsThis {
  class D extends D_Instance {
  }
  class D_Instance extends ಠ_ಠ.clutz.nsThis.C_Instance {
  }
}
declare module 'goog:nsThis.D' {
  import D = ಠ_ಠ.clutz.nsThis.D;
  export default D;
}
