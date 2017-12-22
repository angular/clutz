// Changing this definition to false or removing or renaming it will cause closure to remove
// goog from the list of provided symbols, thus breaking the output.
/**
 * @define {boolean}
 */
var COMPILED = false;

/**
 * @const
 */
var goog = goog || {};

/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
goog.global = this;

/**
 * @param {string} name
 * @return {?}
 */
goog.require = function(name) {};

/**
 * @param {!Function} childCtor Child class.
 * @param {!Function} parentCtor Parent class.
 */
goog.inherits = function(childCtor, parentCtor) {};

/**
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is defined.
 */
goog.isDef = function(val) {};

goog.provide('goog.Uri');
/** @constructor */
goog.Uri =  function() {}

/**
 * Exports a property unobfuscated into the object's namespace.
 * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
 * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
 * @param {Object} object Object whose static property is being exported.
 * @param {string} publicName Unobfuscated name to export.
 * @param {*} symbol Object the name should point to.
 */
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};

/** @struct @constructor @final */
goog.Transpiler = function() {
  /** @private {?Object<string, boolean>} */
  this.requiresTranspilation_ = null;
};

/** @private @final {!goog.Transpiler} */
goog.transpiler_ = new goog.Transpiler();

/**
 * A debug loader is responsible for downloading and executing javascript
 * files in an unbundled, uncompiled environment.
 *
 * @struct @constructor
 */
goog.DebugLoader = function() {
  /**
   * This object is used to keep track of dependencies and other data that is
   * used for loading scripts.
   * @private
   * @type {{
     *   loadFlags: !Object<string, !Object<string, string>>,
     *   nameToPath: !Object<string, string>,
     *   requires: !Object<string, !Object<string, boolean>>,
     *   visited: !Object<string, boolean>,
     *   written: !Object<string, boolean>,
     *   deferred: !Object<string, string>
     * }}
   */
  this.dependencies_ = {
    loadFlags: {},  // 1 to 1

    nameToPath: {},  // 1 to 1

    requires: {},  // 1 to many

    // Used when resolving dependencies to prevent us from visiting file
    // twice.
    visited: {},

    written: {},  // Used to keep track of script files we have written.

    deferred: {}  // Used to track deferred module evaluations in old IEs
  };

  /**
   * Whether IE9 or earlier is waiting on a dependency.  This ensures that
   * deferred modules that have no non-deferred dependencies actually get
   * loaded, since if we defer them and then never pull in a non-deferred
   * script, then `this.loadQueuedModules_` will never be called.  Instead,
   * if not waiting on anything we simply don't defer in the first place.
   * @private {boolean}
   */
  this.oldIeWaiting_ = false;

  /** @private {!Array<string>} */
  this.queuedModules_ = [];

  /** @private {number} */
  this.lastNonModuleScriptIndex_ = 0;
};

/**
 * @return {!goog.Transpiler}
 * @protected @final
 */
goog.DebugLoader.prototype.getTranspiler = function() {
  return goog.transpiler_;
};
