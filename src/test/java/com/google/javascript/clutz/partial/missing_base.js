goog.module('missing.extend');

//!! Using class syntax requires default externs but the test runs faster
//!! without them. Just use @constructor instead.

/**
 * @constructor
 * @extends {direct.ref.A}
 */
function B() {

}

/**
 * @constructor
 * @extends {direct.ref.ATemplated<string, number>}
 */
function BTemplated() {

}

const MissingGoogRequire = goog.require('missing.base');
/**
 * @constructor
 * @extends {MissingGoogRequire}
 */
function ClassExtendingMissingRequire() {

}

/**
 * @param {MissingGoogRequire} c
 */
function FuncWithMissingRequireParam(c) {

}

/** @type {MissingGoogRequire} */
const DeclarationOfMissingRequire = null;

const {MissingDestructuredRequire, OriginalName: RenamedDestructuredRequire} = goog.require('missing.base');

/**
 * @constructor
 * @extends {MissingDestructuredRequire}
 */
function ClassExtendingMissingDestructuredRequire() {

}

/**
 * @constructor
 * @extends {RenamedDestructuredRequire}
 */
function ClassExtendingRenamedDestructuredRequire() {

}

exports.B = B;
exports.BTemplated = BTemplated;
exports.ClassExtendingMissingRequire = ClassExtendingMissingRequire;
exports.FuncWithMissingRequireParam = FuncWithMissingRequireParam;
exports.DeclarationOfMissingRequire = DeclarationOfMissingRequire;
exports.ClassExtendingMissingDestructuredRequire = ClassExtendingMissingDestructuredRequire;
exports.ClassExtendingRenamedDestructuredRequire = ClassExtendingRenamedDestructuredRequire;
