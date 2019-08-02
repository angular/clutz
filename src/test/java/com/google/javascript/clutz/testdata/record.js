goog.provide('namespace.R');
goog.provide('namespace.I');

/** @interface */
namespace.I = function() {};

/** @record */
namespace.R = function() {};

/** @type {boolean} */
namespace.R.prototype.foo;

/** @type {boolean|undefined} */
namespace.R.prototype.optionalFoo;

/** @record */
namespace.I.InnerR = function() {};

/** @type {boolean} */
namespace.I.InnerR.prototype.foo;
