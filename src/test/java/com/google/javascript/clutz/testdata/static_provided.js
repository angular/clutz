goog.provide('a.b.StaticHolder');
goog.provide('a.b.StaticHolder.AnEnum');
goog.provide('a.b.StaticHolder.aFunction');

// Technically inner provides are against JS closure's style guide, but that is not enforced
// thus we need to output reasonable code.

/**
 * @constructor
 */
a.b.StaticHolder = function() {
};

/**
 * @enum {number}
 */
a.b.StaticHolder.AnEnum = {
  X: 0,
  Y: 1
};

/**
 * @return {boolean}
 */
a.b.StaticHolder.aFunction = function() { return true; };