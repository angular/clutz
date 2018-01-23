declare namespace ಠ_ಠ.clutz {
  class module$exports$forward$A extends module$exports$forward$A_Instance {
  }
  class module$exports$forward$A_Instance {
    private noStructuralTyping_: any;
    //!! forward.D may or may not be part of the compilation unit.
    //!! If it is part of it might be a generic at which point TS will error
    //!! if we output just forward.D, so we output any to be on the safe side.
    fn (a : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$forward {
  export import A = ಠ_ಠ.clutz.module$exports$forward$A;
}
declare module 'goog:forward.A' {
  import alias = ಠ_ಠ.clutz.module$exports$forward$A;
  export default alias;
}
