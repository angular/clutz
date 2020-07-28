// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param_generics.js
declare namespace ಠ_ಠ.clutz.nsThisGenerics {
  class A {
    private noStructuralTyping_nsThisGenerics_A : any;
    array < T = any > (this : T ) : T [] ;
    foo < T = any > (this : T ) : ಠ_ಠ.clutz.nsThisGenerics.GenericClass < T > ;
    object < T = any > (this : T ) : { [ key: string ]: T } ;
    record < T = any > (this : T ) : { foo : T } ;
    union < T = any > (this : T ) : ಠ_ಠ.clutz.nsThisGenerics.GenericClass < T > | null | string ;
  }
  class GenericClass < TYPE = any > {
    private noStructuralTyping_nsThisGenerics_GenericClass : [ TYPE ];
    constructor (t : TYPE ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param_generics.js
declare module 'goog:nsThisGenerics' {
  import nsThisGenerics = ಠ_ಠ.clutz.nsThisGenerics;
  export = nsThisGenerics;
}
