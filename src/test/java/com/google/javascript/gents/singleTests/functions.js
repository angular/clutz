var foo = function() {};

// Function params
/**
 * @param {number} n
 */
var bar = function(n) {};

/**
 * @param {boolean} b
 * @param {string} s
 */
function baz(b, s) {}

// Function returns
/**
 * @return {*}
 */
var crack = function() { return "hello"; };

/**
 * @return {number}
 */
function snapple() { return 4; }

// Both params and returns
/**
 * @param {boolean} b
 * @param {string} s
 * @param {?} x
 * @return {string}
 */
var pop = function(b, s, x) { if (b) { return s; }};

// Undefined params

/**
 * @param {undefined} u
 * @param {void} v
 */
var paramUndef = function(u, v) {};

// Void returns

/**
 * @return {void}
 */
var retVoid = function() {};

/**
 * @return {undefined}
 */
var retUndef = function() {};
