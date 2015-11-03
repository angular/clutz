/**
 * @const
 */
var angular = {};

/** @constructor */
angular.Scope = function() {};

/** @type {string} */
angular.Scope.prototype.$$phase;

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 * @return {*}
 */
angular.Scope.prototype.$apply = function(opt_exp) {};

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 */
angular.Scope.prototype.$applyAsync = function(opt_exp) {};

/**
 * @param {Element|HTMLDocument} element
 * @param {Array.<string|Function>=} opt_modules
 * @return {!angular.$injector}
 */
angular.bootstrap = function(element, opt_modules) {};

/**
 * @constructor
 */
angular.$injector = function() {};
