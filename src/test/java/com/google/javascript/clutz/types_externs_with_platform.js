goog.provide('typesWithExterns');
goog.provide('typesWithExterns.A');
goog.provide('typesWithExterns.B');
goog.provide('typesWithExterns.C');
goog.provide('typesWithExterns.ArrayLike');
goog.provide('type_renaming_with_externs');

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

/** @type {Arguments} */
typesWithExterns.b = null;

/** @type {NodeList} */
typesWithExterns.c = null;

/** @typedef {IArrayLike} */
typesWithExterns.ArrayLike;

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
 * @constructor
 * @extends {XMLHttpRequest}
 */
typesWithExterns.ExtendsXMLHttpRequest = function() {};

/**
 * @type {namespace.Foo}
 */
typesWithExterns.myScope = null;

/** @type {IArrayLike<number>} */
type_renaming_with_externs.arrayLike;

/** @type {Arguments<string>} */
type_renaming_with_externs.args;

/** @type {IThenable<string>} */
type_renaming_with_externs.thenable;
