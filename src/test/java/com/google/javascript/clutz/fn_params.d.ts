declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  function declaredWithType ( ...a : any [] ) : any ;
  function optional (x : string , opt_y ? : number ) : number ;
  function optionalNullable (x : string , opt_y ? : number | null ) : number ;
  /**
   * Parameters intentionally documented in the wrong order
   */
  function varargs (x : string ,  ...y : ( number | undefined ) [] ) : void ;
  function varargs_fns ( ...var_args : ( Function | null | undefined ) [] ) : void ;
}
declare module 'goog:fn_params' {
  import alias = ಠ_ಠ.clutz.module$exports$fn_params;
  export = alias;
}
