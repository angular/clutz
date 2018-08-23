goog.provide('angular.$q.Promise');
goog.provide('angular.$q.PromiseService');

/**
 * The examples below come from closure's typings of angular and es6 promise
 *
 * https://github.com/google/closure-compiler/blob/master/externs/es6.js#L1248 and
 * https://github.com/google/closure-compiler/blob/master/contrib/externs/angular-1.6-q_templated.js#L52
 */

/**
 * @constructor
 * @template T
 */
angular.$q.Promise = function() {};

/**
 *
 * @param {?(function(this:THIS, T): VALUE)=} opt_onFulfilled
 * @param {?(function(?): ?)=} opt_onRejected
 * @param {?(function(?): ?)=} opt_notifyCallback
 * @return {RESULT}
 * @template THIS
 * @template VALUE
 * @template RESULT := type('angular.$q.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'angular.$q.Promise'),
 *              unknown(),
 *              V)))))
 *  =:
 */
angular.$q.Promise.prototype.then =
    function(opt_onFulfilled, opt_onRejected, opt_notifyCallback) {};

/**
 *
 * @param {VALUE} promises
 * @template VALUE
 * @return {ALLTYPE}
 * @template ALLTYPE := type('angular.$q.Promise',
 *   cond(isUnknown(VALUE), unknown(),
 *     mapunion(VALUE, (x) =>
 *       cond(sub(x, 'Array'),
 *         cond(isTemplatized(x) && sub(rawTypeOf(x), 'IThenable'),
 *           type('Array', templateTypeOf(x, 0)),
 *           'Array'
 *         ),
 *         cond(isRecord(x),
 *           maprecord(record(x), (kx, vx) => record({[kx]:
 *             cond(isTemplatized(vx) && sub(rawTypeOf(vx), 'IThenable'),
 *               templateTypeOf(vx, 0),
 *               cond(sub(vx, 'angular.$q.Promise'),
 *                 unknown(),
 *                 vx
 *               )
 *             )
 *           })),
 *           'Object')))))
 * =:
 */
angular.$q.Promise.all = function(promises) {};

/**
 * @param {VALUE=} opt_value
 * @return {RESULT}
 * @template VALUE
 * @template RESULT := type('Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 * =:
 */
angular.$q.Promise.resolve = function(opt_value) {};

/**
 * @param {!Array<VALUE>} values
 * @return {!angular.$q.Promise<RESULT>}
 * @template VALUE
 * @template RESULT := mapunion(VALUE, (V) =>
 *     cond(isUnknown(V),
 *         unknown(),
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *             templateTypeOf(V, 0),
 *             cond(sub(V, 'Thenable'), unknown(), V))))
 * =:
 */
angular.$q.Promise.race = function(values) {};

/**
 * @see "https://github.com/google/closure-compiler/commit/be3f15e58812b0843ad0ccc0bcddb5a1506d56e8"
 * @param {VALUE=} opt_value
 * @param {Function=} opt_successCallback
 * @param {Function=} opt_errorCallback
 * @param {Function=} opt_progressCallback
 * @return {RESULT}
 * @template VALUE
 * @template RESULT := type('angular.$q.Promise',
 *     cond(isUnknown(VALUE),
 *       unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 * =:
 */
angular.$q.Promise.prototype.when = function(
    opt_value, opt_successCallback, opt_errorCallback, opt_progressCallback) {};

//!! In angular 'all' is a instance method on the $q service, and not a static
//!! method.
/**
 * @constructor
 * @template T
 */
angular.$q.PromiseService = function() {};

/**
 *
 * @param {VALUE} promises
 * @template VALUE
 * @return {ALLTYPE}
 * @template ALLTYPE := type('angular.$q.Promise',
 *   cond(isUnknown(VALUE), unknown(),
 *     mapunion(VALUE, (x) =>
 *       cond(sub(x, 'Array'),
 *         cond(isTemplatized(x) && sub(rawTypeOf(x), 'IThenable'),
 *           type('Array', templateTypeOf(x, 0)),
 *           'Array'
 *         ),
 *         cond(isRecord(x),
 *           maprecord(record(x), (kx, vx) => record({[kx]:
 *             cond(isTemplatized(vx) && sub(rawTypeOf(vx), 'IThenable'),
 *               templateTypeOf(vx, 0),
 *               cond(sub(vx, 'angular.$q.Promise'),
 *                 unknown(),
 *                 vx
 *               )
 *             )
 *           })),
 *           'Object')))))
 * =:
 */
angular.$q.PromiseService.prototype.all = function(promises) {};

/**
 * @record
 * @template T
 */
angular.$q.PromiseService.Promise = function() {};