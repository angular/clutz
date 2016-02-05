goog.provide('namespace.R');
goog.provide('namespace.I');

/** @interface */
namespace.I = function() {};

/** @record */
namespace.R = function() {};

/** @type {boolean} */
namespace.R.prototype.foo;

/** @record */
namespace.I.InnerR = function() {};

/** @type {boolean} */
namespace.I.InnerR.prototype.foo;
