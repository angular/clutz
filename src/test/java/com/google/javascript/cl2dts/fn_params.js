goog.provide("fn_params");

/**
 * @param {string} x
 * @param {number=} opt_y
 * @return {number}
 */
fn_params.optional = function(x, opt_y) {
  return 1;
};

/**
 * @param {string} x
 * @param {?number=} opt_y
 * @return {number}
 */
fn_params.optionalNullable = function(x, opt_y) {
  return 1;
};

//!! Parameters intentionally documented in the wrong order
/**
 * @param {...number} y
 * @param {string} x
 */
fn_params.varargs = function(x, y) {
};
