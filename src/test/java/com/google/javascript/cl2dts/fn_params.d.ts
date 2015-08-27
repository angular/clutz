declare namespace ಠ_ಠ.cl2dts_internal.fn_params {
  function optional (x : string , opt_y ? : number ) : number ;
  function optionalNullable (x : string , opt_y ? : number ) : number ;
  function varargs (x : string ,  ...y : number [] ) : void ;
}
declare module 'goog:fn_params' {
  import alias = ಠ_ಠ.cl2dts_internal.fn_params;
  export = alias;
}
