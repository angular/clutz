goog.module('bare.reexport');

const {Class} = goog.require('original.module');

//!! Function type annotation is necessary to get clutz to take the branch that
//!! uses the known_class_aliases
/** @type {!Function} */
exports = Class;