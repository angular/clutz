goog.provide('a');

/**
 * @param {number=} opt_precision
 * @return {string}
 */
a.b = function(opt_precision) {
    return goog.isDef(opt_precision) ? a.c(opt_precision) : "undef";
};

/**
 * @param {number} s
 * @return {string}
 */
a.c = function(s) {
    return String(s);
};