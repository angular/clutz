declare namespace ಠ_ಠ.clutz.module$exports$tte$Promise$Partial {
  class PartialDeferred < VALUE = any > extends PartialDeferred_Instance < VALUE > {
  }
  class PartialDeferred_Instance < VALUE = any > extends ಠ_ಠ.clutz.Base_Instance < VALUE > {
    constructor ( ) ;
    then < RESULT > (opt_onFulfilled ? : ( (a : VALUE ) => ಠ_ಠ.clutz.module$exports$tte$Promise$Partial.PartialDeferred < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : ಠ_ಠ.clutz.module$exports$tte$Promise$Partial.PartialDeferred < RESULT > ;
  }
}
declare module 'goog:tte.Promise.Partial' {
  import Partial = ಠ_ಠ.clutz.module$exports$tte$Promise$Partial;
  export = Partial;
}
