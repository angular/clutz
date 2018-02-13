declare namespace ಠ_ಠ.clutz.tte {
  class Promise < T > extends Promise_Instance < T > {
    static all(promises : ಠ_ಠ.clutz.tte.Promise < any > [] ) : ಠ_ಠ.clutz.tte.Promise < any [] > ;
    static race < T > (values : T [] ) : ಠ_ಠ.clutz.tte.Promise < T > ;
    static resolve < T >(value: ಠ_ಠ.clutz.tte.Promise < T > | T): ಠ_ಠ.clutz.tte.Promise < T >;
  }
  class Promise_Instance < T > {
    private noStructuralTyping_: any;
    then < RESULT > (opt_onFulfilled ? : ( (a : T ) => ಠ_ಠ.clutz.tte.Promise < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : ಠ_ಠ.clutz.tte.Promise < RESULT > ;
    when < RESULT, T > (value: T, successCallback: (promiseValue: T) => ಠ_ಠ.clutz.tte.Promise < RESULT >|RESULT, errorCallback: null | undefined |  ((reason: any) => any), notifyCallback?: (state: any) => any): ಠ_ಠ.clutz.tte.Promise < RESULT >;
  }
}
declare module 'goog:tte.Promise' {
  import alias = ಠ_ಠ.clutz.tte.Promise;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.tte {
  class PromiseService < T > extends PromiseService_Instance < T > {
  }
  class PromiseService_Instance < T > {
    private noStructuralTyping_: any;
    all(promises : ಠ_ಠ.clutz.tte.PromiseService.Promise < any > [] ) : ಠ_ಠ.clutz.tte.PromiseService.Promise < any [] > ;
  }
}
declare namespace ಠ_ಠ.clutz.tte.PromiseService {
  interface Promise < T > {
  }
}
declare module 'goog:tte.PromiseService' {
  import alias = ಠ_ಠ.clutz.tte.PromiseService;
  export default alias;
}
