goog.module('nested.exported.enums');

/** @const */
exports = {
  /** @const @enum {string} */
  A: {
    A1: 'a1',
  },
  // The structure of the AST changes if this extra property is present.
  B: 0,
};