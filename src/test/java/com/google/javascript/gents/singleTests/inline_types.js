goog.module('gents.inline_types');

/** @record */
const Foo = function() {}

var /** !Foo */ foo = {};

const /** string */ x = 'fruit';

function /** string */ f(/** number */ x, z, /** string */ y) {
  return x + y + ' apples';
}

/**
 * This line says what the function does!
 * @param {string} y
 * @param {number} z
 */
function /** string */ g(/** number */ x, y, z) {
  return x + y + ' apples' + z;
}

// a single-line comment
/**
 * A JSDoc comment
 */
function /** void */ h() {
}

exports = {Foo, f, g};
