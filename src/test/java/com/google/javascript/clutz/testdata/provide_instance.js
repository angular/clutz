goog.provide('provides.instance');
goog.provide('provides.C');

/** @constructor */
provides.C = function() {};

// Non-nullable type is crucial here, otherwise the object is technically of union type (|null).
/** @const {!provides.C} */
provides.instance = new provides.C();
