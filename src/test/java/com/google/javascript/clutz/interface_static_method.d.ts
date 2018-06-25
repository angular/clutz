declare namespace ಠ_ಠ.clutz.module$exports$interface_static_method {
  namespace ClassIf {
    function staticMethod ( ) : any ;
  }
  interface ClassIf {
    method ( ) : string ;
  }
  namespace FunctionIf {
    function staticMethod ( ) : string ;
    var staticProperty : string ;
  }
  interface FunctionIf {
    method ( ) : string ;
  }
}
declare module 'goog:interface_static_method' {
  import alias = ಠ_ಠ.clutz.module$exports$interface_static_method;
  export = alias;
}
