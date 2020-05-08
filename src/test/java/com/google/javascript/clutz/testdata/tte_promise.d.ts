// Generated from src/test/java/com/google/javascript/clutz/testdata/tte_promise.js
declare namespace ಠ_ಠ.clutz.angular.$q {
  class Promise < T = any > {
    private noStructuralTyping_angular_$q_Promise : any;
    // matching ng.IPromise in angular.d.ts.
    then<TResult1 = T, TResult2 = never>(
        successCallback?:
        | ((value: T) => PromiseLike<never> | PromiseLike<TResult1> | TResult1)
        | null,
            errorCallback?:
        | ((reason: any) => PromiseLike<never> | PromiseLike<TResult2> | TResult2)
        | null,
            notifyCallback?: (state: any) => any
        ): ಠ_ಠ.clutz.angular.$q.Promise<TResult1 | TResult2>;
    then<TResult1 = T, TResult2 = never>(
        successCallback?:
        | ((value: T) => ಠ_ಠ.clutz.angular.$q.Promise<never> | ಠ_ಠ.clutz.angular.$q.Promise<TResult1> | TResult1)
        | null,
            errorCallback?:
        | ((reason: any) => ಠ_ಠ.clutz.angular.$q.Promise<never> | ಠ_ಠ.clutz.angular.$q.Promise<TResult2> | TResult2)
        | null,
            notifyCallback?: (state: any) => any
        ): ಠ_ಠ.clutz.angular.$q.Promise<TResult1 | TResult2>;

    when < RESULT, T > (value: T, successCallback: (promiseValue: T) => ಠ_ಠ.clutz.angular.$q.Promise < RESULT >|RESULT, errorCallback: null | undefined |  ((reason: any) => any), notifyCallback?: (state: any) => any): ಠ_ಠ.clutz.angular.$q.Promise < RESULT >;
    static all(promises : ಠ_ಠ.clutz.angular.$q.Promise < any > [] ) : ಠ_ಠ.clutz.angular.$q.Promise < any [] > ;
    static race < T > (values : T [] ) : ಠ_ಠ.clutz.angular.$q.Promise < T > ;
    static resolve < T >(value: PromiseLike < T > | T): ಠ_ಠ.clutz.angular.$q.Promise < T >;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/tte_promise.js
declare module 'goog:angular.$q.Promise' {
  import Promise = ಠ_ಠ.clutz.angular.$q.Promise;
  export default Promise;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/tte_promise.js
declare namespace ಠ_ಠ.clutz.angular.$q {
  class PromiseService < T = any > {
    private noStructuralTyping_angular_$q_PromiseService : any;
    all(promises : ಠ_ಠ.clutz.angular.$q.PromiseService.Promise < any > [] ) : ಠ_ಠ.clutz.angular.$q.PromiseService.Promise < any [] > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/tte_promise.js
declare namespace ಠ_ಠ.clutz.angular.$q.PromiseService {
  interface Promise < T = any > {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/tte_promise.js
declare module 'goog:angular.$q.PromiseService' {
  import PromiseService = ಠ_ಠ.clutz.angular.$q.PromiseService;
  export default PromiseService;
}
