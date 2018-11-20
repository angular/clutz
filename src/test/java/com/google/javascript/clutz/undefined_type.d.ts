declare namespace ಠ_ಠ.clutz.undefinedns {
  class C {
    private noStructuralTyping_: any;
    constructor (f : ( ) => void , g : ( ) => string | undefined ) ;
  }
  let a : undefined ;
  type alias = { foo ? : boolean } ;
  let b : undefined ;
  let c : undefined | string ;
  function f (a : undefined , b : undefined | string , c ? : string ) : void ;
  function g ( ) : void ;
  function h ( ) : void ;
  function i ( ) : undefined | string ;
}
declare module 'goog:undefinedns' {
  import undefinedns = ಠ_ಠ.clutz.undefinedns;
  export = undefinedns;
}
