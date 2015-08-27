goog.provide('interface_exp');

/** @interface */
interface_exp = function() {};

/** @return {number} */
interface_exp.prototype.method = function() {};

/** @return {number} */
interface_exp.staticMethod = function() {return interface_exp.staticProp;};

/** @type {number} */
interface_exp.staticProp = 0;
