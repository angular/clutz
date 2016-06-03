goog.provide('rec.ns');

// Simple recursive typedefs silently turn into '?' in closure.
/** @typedef {{t: rec.ns.T}} */
rec.ns.T;

/** @const {rec.ns.T} */
rec.ns.tvar = {t: 0};

// Mutually recursive example.
/** @typedef {{arr: (!rec.ns.Arr)}} */
rec.ns.El;

/** @typedef {!Array.<rec.ns.El>} */
rec.ns.Arr;

/** @const {rec.ns.Arr} */
rec.ns.foo = [];

/** @const {rec.ns.El} */
rec.ns.foo2 = {arr: []};