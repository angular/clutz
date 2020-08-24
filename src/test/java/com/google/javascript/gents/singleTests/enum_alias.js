goog.module('enum.alias');

/** @enum */
const E = {
  A: 0,
  B: 1
};

/**
 * Correct form of enum alias.
 * @const
 */
const ConstAlias = E;

/**
 * Incorrect, but accepted form of enum alias.
 * @enum
 */
const EnumAlias = E;

exports = {
  E,
  ConstAlias,
  EnumAlias
};
