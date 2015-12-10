goog.module('googmodule.TheModule');

var Required = goog.require('googmodule.Required');
var requiredModule = goog.require('googmodule.requiredModule');

/** @type {number} */
exports.a = 1;

/** @const */
exports.b = requiredModule.rm;

/** @type {Required} */
exports.required;

/** @type {number} */
var scopedVariable;
