// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare namespace ಠ_ಠ.clutz.nsThis {
  class C {
    private noStructuralTyping_nsThis_C : any;
    bar ( ) : ಠ_ಠ.clutz.nsThis.C ;
    foo ( ) : this ;
    foo2 (str : string ) : this ;
    foo3 < THIS > (this : THIS , arr : THIS [] ) : this ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare module 'goog:nsThis.C' {
  import C = ಠ_ಠ.clutz.nsThis.C;
  export default C;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare namespace ಠ_ಠ.clutz.nsThis {
  class D extends ಠ_ಠ.clutz.nsThis.C {
    private noStructuralTyping_nsThis_D : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare module 'goog:nsThis.D' {
  import D = ಠ_ಠ.clutz.nsThis.D;
  export default D;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare namespace ಠ_ಠ.clutz.nsThis {
  function arrayMap < THIS , VALUE > (callback : ( (this : THIS , a : VALUE , b : number ) => any ) | null , reciever ? : THIS ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare module 'goog:nsThis.arrayMap' {
  import arrayMap = ಠ_ಠ.clutz.nsThis.arrayMap;
  export default arrayMap;
}
