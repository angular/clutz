/**
 * @fileoverview 'transitive.ns' contains 'transitive.ns.Z', which used to
 * cause it being ignored when producing transitively used types.
 */
goog.provide('transitive.ns');
goog.provide('transitive.ns.Z');

/** @return {string} */
transitive.ns.fooFunc = function() { return 'x'; };

/** @constructor */
transitive.ns.Z = function() {};
