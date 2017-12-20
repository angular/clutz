//!! FunctionAlias creates a type alias for Function, which is used in base.js
//!! This test checks that that alias is emitted in a valid format in the goog
//!! namespace
goog.provide('partial.FunctionAlias');

/**
 * @typedef {function(number, number)}
 */
partial.FunctionType1;
/**
 * @typedef {function(string, string, string)}
 */
partial.FunctionType2;

/**
 * @typedef {partial.FunctionType1 | partial.FunctionType2}
 */
partial.FunctionAlias;
