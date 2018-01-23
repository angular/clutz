declare namespace ಠ_ಠ.clutz {
  function module$exports$fn_params$declaredWithType ( ...a : any [] ) : any ;
  function module$exports$fn_params$optional (x : string , opt_y ? : number ) : number ;
  function module$exports$fn_params$optionalNullable (x : string , opt_y ? : number | null ) : number ;
  /**
   * Parameters intentionally documented in the wrong order
   */
  function module$exports$fn_params$varargs (x : string ,  ...y : ( number | undefined ) [] ) : void ;
  function module$exports$fn_params$varargs_fns ( ...var_args : ( Function | null | undefined ) [] ) : void ;
}
declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  export import declaredWithType = ಠ_ಠ.clutz.module$exports$fn_params$declaredWithType;
}
declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  export import optional = ಠ_ಠ.clutz.module$exports$fn_params$optional;
}
declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  export import optionalNullable = ಠ_ಠ.clutz.module$exports$fn_params$optionalNullable;
}
declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  export import varargs = ಠ_ಠ.clutz.module$exports$fn_params$varargs;
}
declare namespace ಠ_ಠ.clutz.module$exports$fn_params {
  export import varargs_fns = ಠ_ಠ.clutz.module$exports$fn_params$varargs_fns;
}
declare module 'goog:fn_params' {
  import alias = ಠ_ಠ.clutz.module$exports$fn_params;
  export = alias;
}
