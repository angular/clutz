goog.module('infer');

/**
 * @param {string} str
 * @return {string}
 */
var f = function(str) {
  return str;
};

const fnCall = f('foo');
const lit = 'foo';

exports.a = fnCall;
exports.b = lit;