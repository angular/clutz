declare namespace ಠ_ಠ.clutz.ns {
  function provide ( ) : void ;
}
declare module 'goog:ns.provide' {
  import provide = ಠ_ಠ.clutz.ns.provide;
  export default provide;
}
declare namespace ಠ_ಠ.clutz.ns.provide {
  class C {
    private noStructuralTyping_ns_provide_C : any;
  }
}
declare namespace ಠ_ಠ.clutz.ns.provide.C {
  class Inner {
    private noStructuralTyping_ns_provide_C_Inner : any;
  }
}
declare module 'goog:ns.provide.C' {
  import C = ಠ_ಠ.clutz.ns.provide.C;
  export default C;
}
