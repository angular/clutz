declare namespace ಠ_ಠ.clutz {
  class module$exports$typedef$C extends module$exports$typedef$C_Instance {
  }
  class module$exports$typedef$C_Instance {
    private noStructuralTyping_: any;
    /**
     * These types should *not* be emitted as PrivateType as typedef.C.T is public.
     * If clutz picks up the jsdoc from "this.privateUsage", as closure incorrectly
     * assigns it, they will emit as PrivateType.
     */
    f (a : ಠ_ಠ.clutz.module$exports$typedef$C$T , b ? : ಠ_ಠ.clutz.module$exports$typedef$C$T , c ? : ( ಠ_ಠ.clutz.module$exports$typedef$C$T ) | null ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$typedef {
  export import C = ಠ_ಠ.clutz.module$exports$typedef$C;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$typedef$C$T = (a : any ) => any ;
}
declare namespace ಠ_ಠ.clutz.module$exports$typedef.C {
  export import T = ಠ_ಠ.clutz.module$exports$typedef$C$T;
}
declare namespace ಠ_ಠ.clutz.module$exports$typedef$C {
  export import T = ಠ_ಠ.clutz.module$exports$typedef$C$T;
}
declare module 'goog:typedef.C' {
  import alias = ಠ_ಠ.clutz.module$exports$typedef$C;
  export default alias;
}
