declare namespace ಠ_ಠ.clutz {
  function module$exports$a$messesWithB (b : ಠ_ಠ.clutz.module$exports$ns$B ) : void ;
}
declare namespace ಠ_ಠ.clutz.module$exports$a {
  export import messesWithB = ಠ_ಠ.clutz.module$exports$a$messesWithB;
}
declare module 'goog:a.messesWithB' {
  import alias = ಠ_ಠ.clutz.module$exports$a$messesWithB;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$ns$A extends module$exports$ns$A_Instance {
  }
  class module$exports$ns$A_Instance {
    private noStructuralTyping_: any;
    fn ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$ns {
  export import A = ಠ_ಠ.clutz.module$exports$ns$A;
}
declare module 'goog:ns.A' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$ns$B extends module$exports$ns$B_Instance {
  }
  class module$exports$ns$B_Instance extends ಠ_ಠ.clutz.module$exports$ns$A_Instance {
    fn ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$ns {
  export import B = ಠ_ಠ.clutz.module$exports$ns$B;
}
declare module 'goog:ns.B' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$B;
  export default alias;
}
