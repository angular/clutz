declare namespace ಠ_ಠ.cl2dts_internal {
  interface interface_exp {
    method ( ) : number ;
  }
  var interface_exp : { staticMethod : ( ) => number , staticProp : number }
}
declare module 'goog:interface_exp' {
  import alias = ಠ_ಠ.cl2dts_internal.interface_exp;
  export default alias;
}
