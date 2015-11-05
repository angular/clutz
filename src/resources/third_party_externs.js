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

// TODO(rado): bring the whole angular externs instead of chunks.
/**
 * @typedef {
 *   function(string, angular.$cacheFactory.Options=):
 *       !angular.$cacheFactory.Cache}
 */
angular.$cacheFactory;

/**
 * @typedef {function(string): ?angular.$cacheFactory.Cache}
 */
angular.$cacheFactory.get;

/** @typedef {{capacity: (number|undefined)}} */
angular.$cacheFactory.Options;

/**
 * @template T
 * @constructor
 */
angular.$cacheFactory.Cache = function() {};

/**
 * @return {!angular.$cacheFactory.Cache.Info}
 */
angular.$cacheFactory.Cache.prototype.info = function() {};

/**
 * @param {string} key
 * @param {T} value
 */
angular.$cacheFactory.Cache.prototype.put = function(key, value) {};

/**
 * @param {string} key
 * @return {T}
 */
angular.$cacheFactory.Cache.prototype.get = function(key) {};

/**
 * @param {string} key
 */
angular.$cacheFactory.Cache.prototype.remove = function(key) {};

angular.$cacheFactory.Cache.prototype.removeAll = function() {};
angular.$cacheFactory.Cache.prototype.destroy = function() {};

/**
 * @typedef {{
 *   id: string,
 *   size: number,
 *   options: angular.$cacheFactory.Options
 *   }}
 */
angular.$cacheFactory.Cache.Info;
