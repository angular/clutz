goog.provide('interface_exp');
goog.provide('interface_exp.SomeEnum');

/** @interface */
interface_exp = function() {};

/** @return {number} */
interface_exp.prototype.method = function() {};

/** @enum {number} */
interface_exp.SomeEnum = {
  A: 1,
  B: 2
};

/** @constructor */
interface_exp.SomeClazz = function() {};
