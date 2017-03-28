declare namespace ಠ_ಠ.clutz.undefinedns {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
    //!! Intentionally keeping string | undefined, as more stylistically correct than
    //!! string | void.
    constructor (f : ( ) => void , g : ( ) => string | undefined ) ;
  }
  var a : undefined ;
  type alias = { foo ? : boolean } ;
  var b : undefined ;
  var c : undefined | string ;
  function f (a : undefined , b : undefined | string , c ? : string ) : void ;
  function g ( ) : void ;
  function h ( ) : void ;
  function i ( ) : undefined | string ;
}
declare namespace goog {
  function require(name: 'undefinedns'): typeof ಠ_ಠ.clutz.undefinedns;
}
declare module 'goog:undefinedns' {
  import alias = ಠ_ಠ.clutz.undefinedns;
  export = alias;
}
