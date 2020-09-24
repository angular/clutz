// Generated from src/test/java/com/google/javascript/clutz/testdata/fn_params.js
declare namespace ಠ_ಠ.clutz.fn_params {
  function declaredWithType ( ...a : any [] ) : any ;
  function optional (x : string , opt_y ? : number ) : number ;
  function optionalNullable (x : string , opt_y ? : number | null ) : number ;
  /**
   * Parameters intentionally documented in the wrong order
   */
  function varargs (x : string ,  ...y : number [] ) : void ;
  function varargs_fns ( ...var_args : ( Function | null ) [] ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/fn_params.js
declare module 'goog:fn_params' {
  import fn_params = ಠ_ಠ.clutz.fn_params;
  export = fn_params;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/fn_params';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/fn_params' {
  import fn_params = ಠ_ಠ.clutz.fn_params;
  export = fn_params;
  const __clutz_actual_namespace: 'fn_params';
}
