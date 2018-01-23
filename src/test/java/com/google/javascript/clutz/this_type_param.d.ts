declare namespace ಠ_ಠ.clutz {
  class module$exports$nsThis$C extends module$exports$nsThis$C_Instance {
  }
  class module$exports$nsThis$C_Instance {
    private noStructuralTyping_: any;
    bar ( ) : ಠ_ಠ.clutz.module$exports$nsThis$C ;
    foo ( ) : this ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$nsThis {
  export import C = ಠ_ಠ.clutz.module$exports$nsThis$C;
}
declare module 'goog:nsThis.C' {
  import alias = ಠ_ಠ.clutz.module$exports$nsThis$C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$nsThis$D extends module$exports$nsThis$D_Instance {
  }
  class module$exports$nsThis$D_Instance extends ಠ_ಠ.clutz.module$exports$nsThis$C_Instance {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$nsThis {
  export import D = ಠ_ಠ.clutz.module$exports$nsThis$D;
}
declare module 'goog:nsThis.D' {
  import alias = ಠ_ಠ.clutz.module$exports$nsThis$D;
  export default alias;
}
