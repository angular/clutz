declare namespace ಠ_ಠ.cl2dts_internal.fn_params {
  function optional (a : string , b ? : number ) : number ;
  function optionalNullable (a : string , b ? : number ) : number ;
  function varargs (a : string ,  ...b : number [] ) : void ;
}
declare module 'goog:fn_params' {
  import alias = ಠ_ಠ.cl2dts_internal.fn_params;
  export = alias;
}
