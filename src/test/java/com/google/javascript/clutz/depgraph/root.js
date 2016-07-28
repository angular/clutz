goog.provide('root.Z');

goog.require('transitive.Y');
goog.require('transitive_unused.X');

/** @constructor */
root.Z = function() {};

/** @return {?transitive.Y} */
root.Z.prototype.useTransitive = function() {
  var unused = new transitive_unused.X();
  return null;
};
