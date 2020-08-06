goog.module('googmodule.TheModule');

var Required = goog.require('googmodule.Required');
var RequiredDefault = goog.require('googmodule.requiredModuleDefault');
var requiredModule = goog.require('googmodule.requiredModule');

/** @type {number} */
exports.a = 1;

/** @const */
exports.b = requiredModule.rm;

/** @type {typeof Required} */
exports.Required = Required;

/** @type {!Required} */
exports.requiredInstance = new Required();

/** @type {typeof RequiredDefault} */
exports.RequiredDefault = RequiredDefault;

/** @type {!RequiredDefault} */
exports.requiredDefaultInstance = new RequiredDefault();

/**
 * @param {typeof RequiredDefault} requiredDefaultCtor
 * @return {!RequiredDefault}
 */
exports.instantiateRequiredDefault = function(requiredDefaultCtor) {
  return new requiredDefaultCtor();
};

/** @type {number} */
var scopedVariable;
