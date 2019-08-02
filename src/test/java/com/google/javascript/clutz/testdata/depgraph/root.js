goog.provide('root.Z');

goog.require('transitive.Y');
goog.require('transitive.ns');
goog.require('transitive.ns.Z');
goog.require('transitive_unused.X');

/** @constructor */
root.Z = function() {};

/** @return {?transitive.Y} */
root.Z.prototype.useTransitive = function() {
  var unused = new transitive_unused.X();
  return null;
};

/** @return {?transitive.ns.Z} */
root.Z.prototype.useTransitiveNamespaced = function() {
  var unused = transitive.ns.fooFunc();
  return null;
};
