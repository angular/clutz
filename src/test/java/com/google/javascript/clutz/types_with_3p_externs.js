goog.provide('typesWithExterns');
goog.provide('typesWithExterns.A');
goog.provide('typesWithExterns.B');
goog.provide('typesWithExterns.C');


/**
 * @return {Element}
 */
typesWithExterns.elementMaybe = function() {return null};

// browser externs extend the Object prototype with hasOwnProperty, etc. This tests that we
// do not output them as TS will support them as part of lib.d.ts.
/** @type {{a: number}} */
typesWithExterns.a = {a: 3};

/**
 * @constructor
 * @param {number} n
 */
typesWithExterns.A = function(n) {
  /** @type {number} */
  this.apply = n;
};

// Closure compiler considers call and apply as properties of functions only if they are used.
// Most common usage is for calling the super constructor as in B and C below.

/**
 * @constructor
 * @extends {typesWithExterns.A}
 */
typesWithExterns.B = function() {
  typesWithExterns.A.call(this, 0);
};
goog.inherits(typesWithExterns.B, typesWithExterns.A);


/**
 * @constructor
 * @extends {typesWithExterns.A}
 */
typesWithExterns.C = function() {
  typesWithExterns.A.apply(this, arguments);
};
goog.inherits(typesWithExterns.C, typesWithExterns.A);


// NewArguments and NewNodeList are copied from an upstream es3.js extern
// TODO(rado): upgrade closure compiler and remove them when released.

/**
 * @constructor
 * @implements {IArrayLike<?>}
 */
function NewArguments() {}

/**
 * @type {number}
 */
NewArguments.prototype.length;

/**
 * @constructor
 * @implements {IArrayLike<?>}
 */
function NewNodeList() {}

/**
 * @type {number}
 */
NewNodeList.prototype.length;


/** @type {NewArguments} */
typesWithExterns.b = null;

/**
 * @typedef {NewNodeList|NewArguments|{length: number}}
 */
typesWithExterns.ArrayLike;

/** @type {typesWithExterns.ArrayLike} */
typesWithExterns.c = null;

/**
 * @param {typesWithExterns.ArrayLike} x
 * @returns {typesWithExterns.ArrayLike}
 */
typesWithExterns.id = function(x) { return x; }

/**
 * @type {!Function}
 */
typesWithExterns.topLevelFunction = function() {};

/**
 * @interface
 * @extends {IThenable}
 */
typesWithExterns.ExtendsIThenable = function() {};

/**
 * @constructor
 * @extends {Error}
 */
typesWithExterns.Error = function() {};


/**
 * @type {namespace.Foo}
 */
typesWithExterns.myScope = null;
