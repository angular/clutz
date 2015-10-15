goog.provide('typedefs');

/**
 * @typedef {function(string): string}
 */
typedefs.strToStr;

/**
 * @typedef {string|function(): string}
 */
typedefs.strOrFunc;

/**
 * If a namespace has only typedefs or is empty it cannot be called with `typeof`.
 * Temporary work-around is to add a variable. Issue #118.
 * @const {number}
 */
typedefs.a = 0;
