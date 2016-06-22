declare namespace ಠ_ಠ.clutz.fn_params {
  function declaredWithType ( ...a : any [] ) : any ;
  function optional (x : string , opt_y ? : number ) : number ;
  function optionalNullable (x : string , opt_y ? : number | null ) : number ;
  /**
   * Parameters intentionally documented in the wrong order
   */
  function varargs (x : string ,  ...y : ( number | undefined ) [] ) : void ;
  function varargs_fns ( ...var_args : ( ( ( ...a : any [] ) => any ) | null | undefined ) [] ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'fn_params'): typeof ಠ_ಠ.clutz.fn_params;
}
declare module 'goog:fn_params' {
  import alias = ಠ_ಠ.clutz.fn_params;
  export = alias;
}
