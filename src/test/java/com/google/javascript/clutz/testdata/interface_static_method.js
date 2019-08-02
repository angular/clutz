goog.module('interface_static_method');

/** @interface */
var FunctionIf = function() {};
/** @return {string} */
FunctionIf.prototype.method = function() {};
/** @return {string} */
FunctionIf.staticMethod = function() { return 'a'; };
/** @type {string} */
FunctionIf.staticProperty;

/** @interface */
class ClassIf {
  /** @return {string} */
  method() {};

  static staticMethod() { return 'a'; }
}

exports.FunctionIf = FunctionIf;
exports.ClassIf = ClassIf;
