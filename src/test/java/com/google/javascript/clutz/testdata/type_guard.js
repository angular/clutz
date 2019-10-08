goog.provide('a');

/**
 * @param {number=} opt_precision
 * @return {string}
 */
a.b = function(opt_precision) {
  return opt_precision !== undefined ? a.c(opt_precision) : "undef";
};

/**
 * @param {number} s
 * @return {string}
 */
a.c = function(s) {
  return s + '';
};
