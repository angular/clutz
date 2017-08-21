goog.provide('enums.EnumWithMethod');

/** @enum {number} */
enums.EnumWithMethod = {
  APPLE: 1,
  BANANA: 2
};

//!! Known issue: does not get emitted.
enums.EnumWithMethod.getColor = function() { return 'RED' /* all fruit are */; }
