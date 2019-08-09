// Generated from src/test/java/com/google/javascript/clutz/testdata/interface_static_method.js
declare namespace ಠ_ಠ.clutz.module$exports$interface_static_method {
  namespace ClassIf {
    function staticMethod ( ) : any ;
  }
  interface ClassIf {
    method ( ) : string ;
  }
  namespace FunctionIf {
    function staticMethod ( ) : string ;
    let staticProperty : string ;
  }
  interface FunctionIf {
    method ( ) : string ;
  }
}
declare module 'goog:interface_static_method' {
  import interface_static_method = ಠ_ಠ.clutz.module$exports$interface_static_method;
  export = interface_static_method;
}
