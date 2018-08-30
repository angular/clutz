goog.module('bare.named.reexport');

const Mod = goog.require('original.module');

exports.Class = Mod.Class;
//!! Note, that we will incorrectly generate a type reexport for fn
//!! even though it is only a value. Since we have partial info
//!! in clutz, we pick the conservative view that everything can be
//!! class and emit a type and a value alias.
exports.fn = Mod.fn;
