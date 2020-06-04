goog.provide('enums.EnumWithInlineMethod');
goog.provide('enums.EnumWithMethod');

/** @enum {number} */
enums.EnumWithMethod = {
  APPLE: 1,
  BANANA: 2
};

enums.EnumWithMethod.getColor = function() {
  return 'RED' /* all fruit are */;
};

/** @enum {number} */
enums.EnumWithInlineMethod = {
  A: 1 + 1,
  B: f(0),
  C: 42,
};

/**
 * @param {number} input
 * @return {number}
 */
function f(input) { return 5; }
