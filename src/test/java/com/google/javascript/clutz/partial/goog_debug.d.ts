declare namespace ಠ_ಠ.clutz.goog.debug {
  //!! Intentionally missing Logger.
  var foo : number ;
}
declare module 'goog:goog.debug' {
  import debug = ಠ_ಠ.clutz.goog.debug;
  export = debug;
}
