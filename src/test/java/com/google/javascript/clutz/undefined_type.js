goog.provide('undefinedns');

/**
 * @const {undefined}
 */
undefinedns.a;

/**
 * @const {void}
 */
undefinedns.b;

/**
 * @const {undefined | string}
 */
undefinedns.c;

/**
 * @param {undefined} a
 * @param {undefined | string} b
 * @param {string=} c
 */
undefinedns.f = function(a, b, c) {};

/**
 * @return {undefined}
 */
undefinedns.g = function() {};


/**
 * @return {void}
 */
undefinedns.h = function() {};

/**
 * @return {undefined | string}
 */
undefinedns.i = function() {};

/**
 * @typedef {{foo: (boolean | undefined)}}
 */
undefinedns.alias;


/**
 * @param {function(): void} f
 * @param {function(): (string|void)} g
 * @constructor
 */
undefinedns.C = function(f, g) {};