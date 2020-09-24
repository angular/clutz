// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare namespace ಠ_ಠ.clutz.nsThis {
  class C {
    private noStructuralTyping_nsThis_C : any;
    bar ( ) : ಠ_ಠ.clutz.nsThis.C ;
    foo ( ) : this ;
    foo2 (str : string ) : this ;
    foo3 < THIS = any > (this : THIS , arr : THIS [] ) : this ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare module 'goog:nsThis.C' {
  import C = ಠ_ಠ.clutz.nsThis.C;
  export default C;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/this_type_param';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/this_type_param' {
  import C = ಠ_ಠ.clutz.nsThis.C;
  export { C };
  const __clutz_strip_property: 'C';
  const __clutz_actual_namespace: 'nsThis.C';
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
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/this_type_param' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare namespace ಠ_ಠ.clutz.nsThis {
  function arrayMap < THIS = any , VALUE = any > (callback : ( (this : THIS , a : VALUE , b : number ) => any ) | null , reciever ? : THIS ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/this_type_param.js
declare module 'goog:nsThis.arrayMap' {
  import arrayMap = ಠ_ಠ.clutz.nsThis.arrayMap;
  export default arrayMap;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/this_type_param' {
  export {};
  const __clutz_multiple_provides: true;
}
