goog.provide('partial.two_args');
goog.provide('partial.one_arg');
goog.provide('partial.FunctionAlias');

/**
 * @typedef {function(number, number?)}
 */
partial.FunctionType1;
/**
 * @typedef {function(string, string, string)}
 */
partial.FunctionType2;

/**
 * @typedef {partial.FunctionType1 | partial.FunctionType2}
 */
partial.FunctionAlias;

/**
 * @type {partial.FunctionAlias}
 */
partial.two_args = function(a, b) {
  return a + b;
};

/**
 * @type {partial.FunctionAlias}
 */
partial.one_arg = goog.partial(partial.two_args, 1);
