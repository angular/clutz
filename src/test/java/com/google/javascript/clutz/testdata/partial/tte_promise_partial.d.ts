// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/tte_promise_partial.js
declare namespace ಠ_ಠ.clutz.module$exports$tte$Promise$Partial {
  class PartialDeferred < VALUE = any > extends ಠ_ಠ.clutz.Base < VALUE > {
    private noStructuralTyping_module$exports$tte$Promise$Partial_PartialDeferred : any;
    constructor ( ) ;
    then < RESULT > (opt_onFulfilled ? : ( (a : VALUE ) => PromiseLike < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : ಠ_ಠ.clutz.module$exports$tte$Promise$Partial.PartialDeferred < RESULT > ;
  }
}
declare module 'goog:tte.Promise.Partial' {
  import Partial = ಠ_ಠ.clutz.module$exports$tte$Promise$Partial;
  export = Partial;
}
