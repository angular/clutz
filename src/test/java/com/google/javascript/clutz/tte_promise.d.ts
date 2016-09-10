declare namespace ಠ_ಠ.clutz.tte {
  class Promise < T > extends Promise_Instance < T > {
    static all(promises : Promise < any > [] ) : Promise < any [] > ;
    static race < T > (values : T [] ) : Promise < T > ;
    static resolve < T >(value: Promise < T > | T): Promise < T >;
  }
  class Promise_Instance < T > {
    private noStructuralTyping_: any;
    then < RESULT > (opt_onFulfilled ? : ( (a : T ) => Promise < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : Promise < RESULT > ;
  }
}
declare namespace goog {
  function require(name: 'tte.Promise'): typeof ಠ_ಠ.clutz.tte.Promise;
}
declare module 'goog:tte.Promise' {
  import alias = ಠ_ಠ.clutz.tte.Promise;
  export default alias;
}
