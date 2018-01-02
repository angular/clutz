goog.provide('goog.log.Level');

goog.require('goog.debug.Logger');

//!! goog.log.Level should be an alias for goog.debug.Logger.Level, not an empty
//!! class
/**
 * @constructor
 * @final
 */
goog.log.Level = goog.debug.Logger.Level;
