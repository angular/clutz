declare module ಠ_ಠ.cl2dts_internal.fn_params {
  export function optional (a : string , b ? : number ) : number ;
  export function optionalNullable (a : string , b ? : number ) : number ;
  export function varargs (a : string ,  ...b : number [] ) : void ;
}
declare module 'goog:fn_params' {
  export = ಠ_ಠ.cl2dts_internal.fn_params;
}
