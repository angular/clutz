goog.module('googmodule.TheModule');

var Required = goog.require('googmodule.Required');
var RequiredDefault = goog.require('googmodule.requiredModuleDefault');
var requiredModule = goog.require('googmodule.requiredModule');

/** @type {number} */
exports.a = 1;

/** @const */
exports.b = requiredModule.rm;

/** @type {Required} */
exports.required;

/** @type {RequiredDefault} */
exports.requiredDefault;

/** @type {number} */
var scopedVariable;
