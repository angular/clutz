goog.provide('original.A');
goog.provide('alias.A');

/** @constructor */
original.A = function() {};

/** @constructor */
original.A.InnerC = function() {};

/** @const */
alias.A = original.A;