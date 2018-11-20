declare namespace ಠ_ಠ.clutz.nsThis {
  class C {
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
  class D extends ಠ_ಠ.clutz.nsThis.C {
  }
}
declare module 'goog:nsThis.D' {
  import D = ಠ_ಠ.clutz.nsThis.D;
  export default D;
}
