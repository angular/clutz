declare namespace ಠ_ಠ.clutz.module$exports$tte$Promise$Partial {
  class PartialDeferred < VALUE = any > extends PartialDeferred_Instance < VALUE > {
  }
  class PartialDeferred_Instance < VALUE = any > extends Base < VALUE > {
    constructor ( ) ;
    then < RESULT > (opt_onFulfilled ? : ( (a : VALUE ) => PartialDeferred < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : PartialDeferred < RESULT > ;
  }
}
declare module 'goog:tte.Promise.Partial' {
  import alias = ಠ_ಠ.clutz.module$exports$tte$Promise$Partial;
  export = alias;
}
