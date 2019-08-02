goog.provide('enums.EnumWithMethod');
goog.provide('enums.EnumWithInlineMethod');

/** @enum {number} */
enums.EnumWithMethod = {
  APPLE: 1,
  BANANA: 2
};

//!! Known issue: does not get emitted.
enums.EnumWithMethod.getColor = function() { return 'RED' /* all fruit are */; }

/** @enum {number} */
enums.EnumWithInlineMethod = {
  A: 1 + 1,
  B: f(0),
  C: 42,
}

/**
 * @param {number} input
 * @return {number}
 */
function f(input) { return 5; }
