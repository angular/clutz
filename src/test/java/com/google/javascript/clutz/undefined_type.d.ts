declare namespace ಠ_ಠ.clutz.undefinedns {
  var a : undefined ;
  type alias = { foo ? : boolean } ;
  var b : undefined ;
  var c : undefined | string ;
  function f (a : undefined , b : undefined | string , c ? : string ) : void ;
  function g ( ) : void ;
  function h ( ) : void ;
  function i ( ) : undefined | string ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'undefinedns'): typeof ಠ_ಠ.clutz.undefinedns;
}
declare module 'goog:undefinedns' {
  import alias = ಠ_ಠ.clutz.undefinedns;
  export = alias;
}
