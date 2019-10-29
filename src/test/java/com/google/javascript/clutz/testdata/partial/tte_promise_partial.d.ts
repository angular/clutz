// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/tte_promise_partial.js
declare namespace ಠ_ಠ.clutz.module$exports$tte$Promise$Partial {
  export import PartialDeferred = ಠ_ಠ.clutz.module$contents$tte$Promise$Partial_PartialDeferred ;
}
declare module 'goog:tte.Promise.Partial' {
  import Partial = ಠ_ಠ.clutz.module$exports$tte$Promise$Partial;
  export = Partial;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/tte_promise_partial.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$tte$Promise$Partial_PartialDeferred < VALUE = any > extends ಠ_ಠ.clutz.Base < VALUE > {
    private noStructuralTyping_module$contents$tte$Promise$Partial_PartialDeferred : any;
    constructor ( ) ;
    then < RESULT > (opt_onFulfilled ? : ( (a : VALUE ) => PromiseLike < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : ಠ_ಠ.clutz.module$contents$tte$Promise$Partial_PartialDeferred < RESULT > ;
  }
}
