goog.provide('a.messesWithB');
goog.provide('ns.A');
goog.provide('ns.B');

/**
 * @param {!ns.B} b
 */
a.messesWithB = function(b) {
  b.fn = function() {};
}

/**
 * @constructor
 */
ns.A = function() {
  /** @type {function():void} */
  this.fn;
}

/**
 * @constructor
 * @extends {ns.A}
 */
ns.B = function() {};