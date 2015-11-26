goog.provide('interface_exp');
goog.provide('interface_exp.SomeEnum');

/** @interface */
interface_exp = function() {};

/** @return {number} */
interface_exp.prototype.method = function() {};

/** @return {number} */
interface_exp.staticMethod = function() {return interface_exp.staticProp;};

/** @type {number} */
interface_exp.staticProp = 0;

/** @enum {number} */
interface_exp.SomeEnum = {
  A: 1,
  B: 2
};

/** @constructor */
interface_exp.SomeClazz = function() {};
