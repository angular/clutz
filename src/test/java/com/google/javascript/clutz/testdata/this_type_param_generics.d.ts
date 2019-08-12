// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param_generics.js
declare namespace ಠ_ಠ.clutz.nsThisGenerics {
  class A {
    private noStructuralTyping_nsThisGenerics_A : any;
    array < T > (this : T ) : T [] ;
    foo < T > (this : T ) : ಠ_ಠ.clutz.nsThisGenerics.GenericClass < T > ;
    object < T > (this : T ) : { [ key: string ]: T } ;
    record < T > (this : T ) : { foo : T } ;
    union < T > (this : T ) : ಠ_ಠ.clutz.nsThisGenerics.GenericClass < T > | null | string ;
  }
  class GenericClass < TYPE > {
    private noStructuralTyping_nsThisGenerics_GenericClass : any;
    constructor (t : TYPE ) ;
  }
}
declare module 'goog:nsThisGenerics' {
  import nsThisGenerics = ಠ_ಠ.clutz.nsThisGenerics;
  export = nsThisGenerics;
}
