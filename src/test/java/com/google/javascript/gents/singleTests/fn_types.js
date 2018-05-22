// 'Function' type
/**
 * @type {Function}
 */
var nop = function() {};

/**
 * @type {Function}
 */
var foo = function(a, b, c) { return a + b + c; };

// Infers return type as 'any' by default
/**
 * @type {function()}
 */
var inferRetAny = function() {};

/**
 * @type {function() : void}
 */
var typedRetVoid = function() {};

// Normal Parameters
/**
 * @type {function(number, string) : number}
 */
var basicParams = function(n, s) { return n; };

// Optional Parameters
/**
 * @type {function(number, string=, boolean=)}
 */
var optParams = function(n, s, b) {};

// Variadic parameters
/**
 * @type {function(number, ...)}
 */
var restParams = function(n, r) {};

/**
 * @type {function(number, ...boolean)}
 */
var restParamsTyped = function(n, br) {};

/**
 * @type {function(number, boolean=, ...): number}
 */
const complex = function(n, o, r) { return n; };

/** @type {?function():string} */
let f1 = null;

/** @type {function()|string} */
const f2 = 'string';

/** @type {function():string|function():string} */
const f3 = function() {
  return 'string';
};

/** @type {function():(string|function():string)} */
const f4 = function() {
  return 'string';
};