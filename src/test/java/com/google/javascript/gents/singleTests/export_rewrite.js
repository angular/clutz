goog.provide("A.B");

A.B = function() {};

/** @constructor */
A.B.Klass = function() {};

/** @type {number} */
A.B.Klass.NUM = 4;

A.B();
var x = A.B.Klass();
var y = A.B.Klass.NUM;

/** @type {A.B.Klass} */
var z = x;
