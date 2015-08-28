declare namespace ಠ_ಠ.cl2dts_internal.goog.multi_provides {
  var three : string ;
}
declare module 'goog:goog.multi_provides' {
  import alias = ಠ_ಠ.cl2dts_internal.goog.multi_provides;
  export = alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.goog.multi_provides {
  class Two {
  }
}
declare module 'goog:goog.multi_provides.Two' {
  import alias = ಠ_ಠ.cl2dts_internal.goog.multi_provides.Two;
  export default alias;
}
