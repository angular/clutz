goog.module('an.enum');

/**
 * @enum {number}
 */
const NumEnumNoExport = {
  A: 0,
  B: 1000
};

/**
 * A non-trivial comment.
 * @enum {number}
 */
const NumEnum = {
  C: 0,
  D: 1000
};

/** @enum {number} */
const NonConseqNumEnum = {
  // Comment A
  A: 0,
  B: 2,
  // Comment C
  C: 3,
  D: -2,
  E: -1
};

/** @enum {number} */
const RepeatedNumEnum = {
  A: 0,
  B: 0,
  C: 2,
  D: 2
};

/** @enum {number} */
const EnumWithArithmetics = {
  A: 10 * 10 + 2,
  B: 2
};

/** @enum {string} My useful comment */
const StrEnum = {
  A: 'foo',
  B: 'bar'
};

/** @enum {{a: number}} */
const OtherEnum = {
  A: {a: 0},
  B: {a: 1}
};

class C {}

// This cannot be easily converted without structurally changing the code.
// TypeScript does not support inner enums. The enum and the class have to be
// module level siblings, which would lead to having to rewrite all references
// too.

/** @enum {number} */
C.InnerEnum = {
  A: 0,
  B: 1
};

exports.C = C;
exports.NumEnum = NumEnum;
exports.NonConseqNumEnum = NonConseqNumEnum;
exports.RepeatedNumEnum = RepeatedNumEnum;
exports.EnumWithArithmetics = EnumWithArithmetics;
exports.StrEnum = StrEnum;
exports.OtherEnum = OtherEnum;

/** @enum {number} */
exports.Numbers = {
  ONE: 1,
  TWO: 2,
};
