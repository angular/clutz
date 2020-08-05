goog.module('gents.functions');

// TODO(b/142972217): Add more tests, e.g. with default parameters, aliasing,
// and multiline blocks.

var nop = function() {};

// Function params
/**
 * @param {number} n
 */
var oneParam = function(n) {};

/**
 * @param {boolean} b
 * @param {string} s
 */
function twoParams(b, s) {}

/** @param {!Array<?>=} list */
function withDefaultValue(list = []) {}

/**
 * @param {boolean=} a
 */
function undefinedDefault(a = undefined) {}

/** @param {!Array<?>=} list */
function undefinedDefaultArray(list = undefined) {}

// Function returns
/**
 * @return {*}
 */
var anyReturn = function() {
  return 'hello';
};

/**
 * @return {number}
 */
function typedReturn() {
  return 4;
}

/** @return {!Promise<number>} */
function typedReturnTwo() {
  return Promise.resolve(4);
}

/**
 * @param {number} n
 * @param {boolean} b
 */
var partiallyTyped = function(n, u1, b, u2) {};

// Both params and returns
/**
 * @param {boolean} b
 * @param {string} s
 * @param {?} x
 * @return {?string}
 */
var complex = function(b, s, x) {
  if (b) {
    return s;
  }
  return null;
};

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

/** @return {undefined} */
var retUndefTwo = function() {
  return undefined;
};

/** @return {!Promise<undefined>} */
var retUndefThree =
    async function() {
  return undefined;
}

/** @return {!Promise<void>} */
var retUndefFour =
    async function() {
  return undefined;
}

/** @return {!Promise<void>} */
var retUndefFive =
    async function() {}

/** @return {!Promise} */
var retUndefSix =
    async function() {}

/** @return {number|void} */
var retVoidUnion = function () {}

/** @return {Promise<?number>} */
var retMaybeNumber =
    async function() {
  return 0;
}

/**
 * @param {number} a
 * @return {number}
 */
const arrowWithJsDoc = a => {
  return a;
};

/**
 * @param {number} a
 * @return {number}
 */
const arrowWithJsDocAndParens = (a) => {
  return a;
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const arrowWithJsDocMultiArg = (a, b) => {
  return a;
};

const arrowNoJsDoc = a => {
  return a;
};

const implicitReturnArrow = a => a;

// Argument descructuring
/** @param {{a: number}} params */
function namedParams({a}) {}

/**
 * @param {{
 *   a: number,
 * }} params
 */
function namedParamsMultiLine({a}) {}

/** @param {{a: (number|undefined)}=} params */
function namedParamsWithDefaultValues({a = 1} = {}) {}

/** @return {string} */
const hi1 = (/** number */ one, /** number */ two) => {
  return `Hello ${one}, ${two}.`;
};

/** @return {string} */
function hi2(/** number */ one, /** number */ two) {
  return `Hello ${one}, ${two}.`;
};

/**
 * @this {!Array}
 * @param {any} searchElement
 * @param {number=} fromIndex
 */
Array.prototype.indexOf = function(searchElement, fromIndex) {
  for (let i = fromIndex || 0; i < this.length; ++i) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

/**
 * @param {typeof String} strCls
 */
function mkstr(strCls) {
  return new strCls('sydney opera house');
}

exports = {nop, oneParam, twoParams, namedParams, namedParamsMultiLine, namedParamsWithDefaultValues};
