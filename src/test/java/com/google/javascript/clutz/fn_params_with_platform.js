/**
 * @fileoverview This module tests es6 destructuring function parameters.
 * It should be part of the 'fn_params' test but right now JSCompiler pulls
 * in the ES6 polyfills when type-checking this.
 */
goog.module('fn_params_with_platform');

exports.es6args = function([arr1, arr2], {obj1, obj2}, ...rest) {};
