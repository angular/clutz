// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_promise_with_platform.js
declare namespace ಠ_ಠ.clutz.goog {
  class Promise < TYPE , RESOLVER_CONTEXT > implements ಠ_ಠ.clutz.goog.Thenable < TYPE > {
    private noStructuralTyping_goog_Promise : any;
    constructor (resolver : (this : RESOLVER_CONTEXT , a : (a ? : TYPE | PromiseLike < TYPE > | null | { then : any } ) => any , b : (a ? : any ) => any ) => void , opt_context ? : RESOLVER_CONTEXT ) ;
    then < RESULT > (opt_onFulfilled ? : ( (a : TYPE ) => PromiseLike < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) :  any ;
    static all < TYPE > (promises : any [] ) : ಠ_ಠ.clutz.goog.Promise < TYPE [] , any > ;
    static race < TYPE > (promises : any [] ) : ಠ_ಠ.clutz.goog.Promise < TYPE , any > ;
    static resolve < T >(value: PromiseLike < T > | T): any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_promise_with_platform.js
declare module 'goog:goog.Promise' {
  import Promise = ಠ_ಠ.clutz.goog.Promise;
  export default Promise;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_promise_with_platform.js
declare namespace ಠ_ಠ.clutz.goog {
  namespace Thenable {
    let IMPLEMENTED_BY_PROP : string ;
    function addImplementation (ctor : { new ( ...a : any [] ) : ಠ_ಠ.clutz.goog.Thenable < any > } ) : void ;
    function isImplementedBy (object : any ) : boolean ;
  }
  interface Thenable < TYPE > extends PromiseLike < TYPE > {
    then < RESULT > (opt_onFulfilled ? : ( (a : TYPE ) => PromiseLike < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : ಠ_ಠ.clutz.goog.Thenable < RESULT > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/goog_promise_with_platform.js
declare module 'goog:goog.Thenable' {
  import Thenable = ಠ_ಠ.clutz.goog.Thenable;
  export default Thenable;
}
