goog.provide('multi_provides.a');

/** @const */
multi_provides.a.val = 10;

goog.provide('multi_provides.a.b.c');
goog.provide('multi_provides.a.b.c.Two');

/** @constructor */
multi_provides.a.b.c.Two = function() {};

/** @type {string} */
multi_provides.a.b.c.three = "three";
