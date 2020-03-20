goog.module('gents.externs.override');

class TimePiece {
  /**
   * Get the current time.
   * @return {?} The current time.
   */
  getTime() {
    return Date.now();
  }

  /**
   * Array input and output.
   * @param {Array<?>} arr some input
   * @return {Array<?>}
   */
  getArray1(arr) {
    return [];
  }

  /**
   * Array input and output.
   * @param {Array} arr some input
   * @return {Array}
   */
  getArray2(arr) {
    return [];
  }
}

/**
 * Array input and output.
 * @param {Array} arr some input
 * @return {Array}
 */
function getArray3(arr) {
  return [];
}

/** @type {Array<?>} */
const x1 = [];

/** @type {Array} */
const y1 = [];

const z1 = [];
