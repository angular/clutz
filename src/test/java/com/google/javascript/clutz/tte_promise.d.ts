declare namespace ಠ_ಠ.clutz {
  class module$exports$tte$Promise < T > extends module$exports$tte$Promise_Instance < T > {
    static all(promises : module$exports$tte$Promise < any > [] ) : module$exports$tte$Promise < any [] > ;
    static race < T > (values : T [] ) : module$exports$tte$Promise < T > ;
    static resolve < T >(value: module$exports$tte$Promise < T > | T): module$exports$tte$Promise < T >;
  }
  class module$exports$tte$Promise_Instance < T > {
    private noStructuralTyping_: any;
    then < RESULT > (opt_onFulfilled ? : ( (a : T ) => module$exports$tte$Promise < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : module$exports$tte$Promise < RESULT > ;
    when < RESULT, T > (value: T, successCallback: (promiseValue: T) => module$exports$tte$Promise < RESULT >|RESULT, errorCallback: null | undefined |  ((reason: any) => any), notifyCallback?: (state: any) => any): module$exports$tte$Promise < RESULT >;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$tte {
  export import Promise =  ಠ_ಠ.clutz.module$exports$tte$Promise;
}
declare module 'goog:tte.Promise' {
  import alias = ಠ_ಠ.clutz.module$exports$tte$Promise;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$tte$PromiseService < T > extends module$exports$tte$PromiseService_Instance < T > {
  }
  class module$exports$tte$PromiseService_Instance < T > {
    private noStructuralTyping_: any;
    all(promises : module$exports$tte$PromiseService.Promise < any > [] ) : module$exports$tte$PromiseService.Promise < any [] > ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$tte {
  export import PromiseService =  ಠ_ಠ.clutz.module$exports$tte$PromiseService;
}
declare namespace ಠ_ಠ.clutz.module$exports$tte$PromiseService {
  interface Promise < T > {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$tte.PromiseService {
  export import Promise =  ಠ_ಠ.clutz.module$exports$tte$PromiseService.Promise;
}
declare module 'goog:tte.PromiseService' {
  import alias = ಠ_ಠ.clutz.module$exports$tte$PromiseService;
  export default alias;
}
