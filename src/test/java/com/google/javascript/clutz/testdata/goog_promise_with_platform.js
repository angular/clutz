//!! goog.Promise (https://github.com/google/closure-library/blob/master/closure/goog/promise/promise.js),
//!! unlike other implementations of Promise, has 2 template params this test ensures
//!! that the specially handled TTE methods work for it as well
goog.provide('goog.Promise');
goog.provide('goog.Thenable');

/**
 * @interface
 * @extends {IThenable<TYPE>}
 * @template TYPE
 */
goog.Thenable = function() {};


/**
 * @param {?(function(this:THIS, TYPE): VALUE)=} opt_onFulfilled A
 *     function that will be invoked with the fulfillment value if the Promise
 *     is fulfilled.
 * @param {?(function(this:THIS, *): *)=} opt_onRejected A function that will
 *     be invoked with the rejection reason if the Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     with the default this.
 *
 * @return {RESULT} A new Promise that will receive the result
 *     of the fulfillment or rejection callback.
 * @template VALUE
 * @template THIS
 *
 * When a Promise (or thenable) is returned from the fulfilled callback,
 * the result is the payload of that promise, not the promise itself.
 *
 * @template RESULT := type('goog.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 *  =:
 *
 */
goog.Thenable.prototype.then = function(
    opt_onFulfilled, opt_onRejected, opt_context) {};


/**
 * @const
 */
goog.Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';


/**
 * @param {function(new:goog.Thenable,...?)} ctor The class constructor. The
 *     corresponding class must have already implemented the interface.
 */
goog.Thenable.addImplementation = function(ctor) {};


/**
 * @param {?} object
 * @return {boolean} Whether a given instance implements `goog.Thenable`.
 *     The class/superclass of the instance must call `addImplementation`.
 */
goog.Thenable.isImplementedBy = function(object) {};

/**
 * @param {function(
 *             this:RESOLVER_CONTEXT,
 *             function((TYPE|IThenable<TYPE>|Thenable)=),
 *             function(*=)): void} resolver
 *     Initialization function that is invoked immediately with `resolve`
 *     and `reject` functions as arguments. The Promise is resolved or
 *     rejected with the first argument passed to either function.
 * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
 *     resolver function. If unspecified, the resolver function will be executed
 *     in the default scope.
 * @constructor
 * @struct
 * @final
 * @implements {goog.Thenable<TYPE>}
 * @template TYPE,RESOLVER_CONTEXT
 */
goog.Promise = function(resolver, opt_context) {};

/**
 * @param {VALUE=} opt_value
 * @return {RESULT} A new Promise that is immediately resolved
 *     with the given value. If the input value is already a goog.Promise, it
 *     will be returned immediately without creating a new instance.
 * @template VALUE
 * @template RESULT := type('goog.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'Thenable'),
 *              unknown(),
 *              V)))))
 * =:
 */
goog.Promise.resolve = function(opt_value) {};

/**
 * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!goog.Promise<TYPE>} A Promise that receives the result of the
 *     first Promise (or Promise-like) input to settle immediately after it
 *     settles.
 * @template TYPE
 */
goog.Promise.race = function(promises) {};


/**
 * @param {!Array<?(goog.Promise<TYPE>|goog.Thenable<TYPE>|Thenable|*)>}
 *     promises
 * @return {!goog.Promise<!Array<TYPE>>} A Promise that receives a list of
 *     every fulfilled value once every input Promise (or Promise-like) is
 *     successfully fulfilled, or is rejected with the first rejection reason
 *     immediately after it is rejected.
 * @template TYPE
 */
goog.Promise.all = function(promises) {};

/**
 * @override
 */
goog.Promise.prototype.then = function(
    opt_onFulfilled, opt_onRejected, opt_context) {};
goog.Thenable.addImplementation(goog.Promise);