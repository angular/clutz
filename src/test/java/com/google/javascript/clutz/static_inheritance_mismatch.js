goog.provide('static_inherit.Parent');
goog.provide('static_inherit.Child');
goog.provide('static_inherit.GrandChild');

/** @constructor */
static_inherit.Parent = function() {};
/** @param {string} a */
static_inherit.Parent.static_fn = function(a) {};
/**
 * @type {string}
 * @private
 */
static_inherit.Parent.privateParentOverrideField;
/**
 * @type {number}
 */
static_inherit.Parent.privateChildOverrideField;
/**
 * @type {!Object}
 */
static_inherit.Parent.subTypeField;
/**
 * @type {!static_inherit.Parent}
 */
static_inherit.Parent.subTypeFieldMirrorType;

/** @constructor @extends {static_inherit.Parent} */
static_inherit.Child = function() {};
/** @param {number} a */
static_inherit.Child.static_fn = function(a) {};
/**
 * @type {number}
 */
static_inherit.Child.privateParentOverrideField;
/**
 * @private {string}
 */
static_inherit.Child.privateChildOverrideField;
/**
 * @type {!Array}
 */
static_inherit.Child.subTypeField;
/**
 * @type {!static_inherit.Child}
 */
static_inherit.Child.subTypeFieldMirrorType;


/** @constructor @extends {static_inherit.Child} */
static_inherit.GrandChild = function() {};
/** @param {boolean} a */
static_inherit.GrandChild.static_fn = function(a) {};
/**
 * @type {!static_inherit.GrandChild}
 */
static_inherit.GrandChild.subTypeFieldMirrorType;
