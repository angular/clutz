goog.provide("fn_params");

/**
 * @param {string} a
 * @param {number=} opt_b
 * @return {number}
 */
fn_params.optional = function(a, opt_b) {
  return 1;
};

/**
 * @param {string} a
 * @param {?number=} opt_b
 * @return {number}
 */
fn_params.optionalNullable = function(a, opt_b) {
  return 1;
};

/**
 * @param {string} a
 * @param {...number} b
 * @return {number}
 */
fn_params.varargs = function(a, b) {
  return 1;
};
