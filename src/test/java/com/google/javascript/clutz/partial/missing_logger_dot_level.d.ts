declare namespace ಠ_ಠ.clutz.goog.log {
  type Level = ಠ_ಠ.clutz.goog.debug.Logger.Level ;
  let Level : typeof ಠ_ಠ.clutz.goog.debug.Logger.Level ;
}
declare module 'goog:goog.log.Level' {
  import Level = ಠ_ಠ.clutz.goog.log.Level;
  export default Level;
}
