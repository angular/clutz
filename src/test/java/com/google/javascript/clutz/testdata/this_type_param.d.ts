declare namespace ಠ_ಠ.clutz.nsThis {
  class C {
    private noStructuralTyping_nsThis_C : any;
    bar ( ) : ಠ_ಠ.clutz.nsThis.C ;
    foo ( ) : this ;
    foo2 (str : string ) : this ;
    foo3 < THIS > (this : THIS , arr : THIS [] ) : this ;
  }
}
declare module 'goog:nsThis.C' {
  import C = ಠ_ಠ.clutz.nsThis.C;
  export default C;
}
declare namespace ಠ_ಠ.clutz.nsThis {
  class D extends ಠ_ಠ.clutz.nsThis.C {
    private noStructuralTyping_nsThis_D : any;
  }
}
declare module 'goog:nsThis.D' {
  import D = ಠ_ಠ.clutz.nsThis.D;
  export default D;
}
