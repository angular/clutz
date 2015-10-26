goog.provide('static_inherit.Parent');
goog.provide('static_inherit.Child');
goog.provide('static_inherit.GrandChild');

/** @constructor */
static_inherit.Parent = function() {};
/** @param {string} a */
static_inherit.Parent.static_fn = function(a) {};

/** @constructor @extends {static_inherit.Parent} */
static_inherit.Child = function() {};
/** @param {number} a */
static_inherit.Child.static_fn = function(a) {};

/** @constructor @extends {static_inherit.Child} */
static_inherit.GrandChild = function() {};
/** @param {boolean} a */
static_inherit.GrandChild.static_fn = function(a) {};
