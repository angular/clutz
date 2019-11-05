goog.module('lost.enum.alias');

const {E} = goog.require('some.other.Enum');


/**
 * Partial alias of some of the enum fields.
 * @enum {E}
 */
const EAlias = {
  A: E.A,
};

/**
 * @typedef {{
 *   e: (EAlias|undefined),
 * }}
 */
let TypeDef;

//!! Surprisingly, the presence of this usage of the TypeDef is load-bearing for
//!! the malformed emitted .d.ts.
class C {
  constructor() {
    /** @type {!TypeDef} */
    this.t;
  }
}

exports.EAlias = EAlias;
exports.TypeDef = TypeDef;
exports.C = C;
