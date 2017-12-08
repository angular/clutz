goog.module('missing.extend');

//!! Using class syntax requires default externs but the test runs faster
//!! without them. Just use @constructor instead.

/**
 * @constructor
 * @extends {direct.ref.A}
 */
function ClassExtendingMissing() {

}

/**
 * @constructor
 * @extends {direct.ref.ATemplated<string, number>}
 */
function ClassExtendingMissingTemplated() {

}

/**
 * @param {number} x
 * @constructor
 * @extends {direct.ref.A}
 */
function ClassExtendingMissingWithParam(x) {

}

exports.ClassExtendingMissing = ClassExtendingMissing;
exports.ClassExtendingMissingTemplated = ClassExtendingMissingTemplated;
exports.ClassExtendingMissingWithParam = ClassExtendingMissingWithParam;
