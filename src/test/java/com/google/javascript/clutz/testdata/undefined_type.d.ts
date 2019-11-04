// Generated from src/test/java/com/google/javascript/clutz/testdata/undefined_type.js
declare namespace ಠ_ಠ.clutz.undefinedns {
  class C {
    private noStructuralTyping_undefinedns_C : any;
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
// Generated from src/test/java/com/google/javascript/clutz/testdata/undefined_type.js
declare module 'goog:undefinedns' {
  import undefinedns = ಠ_ಠ.clutz.undefinedns;
  export = undefinedns;
}
