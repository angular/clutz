/**
 * @const
 */
var namespace = {};

/** @constructor */
namespace.Foo = function() {};

/** @type {string} */
namespace.Foo.prototype.member;

/** @type {string} */
namespace.Foo.staticField;

/** @return {string} */
namespace.Foo.staticMethod;

/**
 * @param {function(!namespace.Foo)=} opt_exp
 */
namespace.Foo.prototype.method = function(opt_exp) {};

/**
 * @param {Element|HTMLDocument} arg1
 * @param {Array.<string|Function>=} opt_arg2
 */
namespace.bootstrap = function(arg1, opt_arg2) {};


// TODO(rado): add integration tests with angular and polymer externs.
/**
 * @typedef {
 *   function(string, namespace.atypedef.Options=):
 *       !namespace.atypedef.Cache}
 */
namespace.atypedef;

/**
 * @typedef {function(string): ?namespace.atypedef.Cache}
 */
namespace.atypedef.get;

/** @typedef {{capacity: (number|undefined)}} */
namespace.atypedef.Options;

/**
 * @template T
 * @constructor
 */
namespace.atypedef.Cache = function() {};

/**
 * @return {!namespace.atypedef.Cache.Info}
 */
namespace.atypedef.Cache.prototype.info = function() {};

/**
 * @param {string} key
 * @param {T} value
 */
namespace.atypedef.Cache.prototype.put = function(key, value) {};

/**
 * @param {string} key
 * @return {T}
 */
namespace.atypedef.Cache.prototype.get = function(key) {};

/**
 * @param {string} key
 */
namespace.atypedef.Cache.prototype.remove = function(key) {};

namespace.atypedef.Cache.prototype.removeAll = function() {};
namespace.atypedef.Cache.prototype.destroy = function() {};

/**
 * @typedef {{
 *   id: string,
 *   size: number,
 *   options: namespace.atypedef.Options
 *   }}
 */
namespace.atypedef.Cache.Info;

/**
 * @type {Object}
 */
namespace.subNamespace = {};

/**
 * @type {string}
 */
namespace.subNamespace.fieldA = '';

/**
 * @type {number}
 */
namespace.subNamespace.fieldB = 0;

/**
 * @param {!{is: string}} descriptor
 */
var FunctionNamespace = function(descriptor) {};

/**
 * @constructor
 */
var FunctionNamespaceHelperClass = function() {};

/**
 * @param {?Node|?Event} nodeOrEvent
 * @return {!FunctionNamespaceHelperClass}
 */
FunctionNamespace.dom = function(nodeOrEvent) {};
