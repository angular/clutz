goog.module("goog.module.importer");

const MissingGoogRequire = goog.require('googprovide.exporter');
/**
 * @constructor
 * @extends {MissingGoogRequire}
 */
function ClassExtendingMissingRequire() {

}

const {LegacyBaseClass, OriginalName: Rename} = goog.require('goog.legacy.namespace.exporter');
/**
 * @constructor
 * @extends {LegacyBaseClass}
 */
function ClassExtendingLegacyBaseClass() {

}
/**
 * @constructor
 * @extends {Rename}
 */
function ClassExtendingRename() {

}

exports.ClassExtendingMissingRequire = ClassExtendingMissingRequire;
exports.ClassExtendingLegacyBaseClass = ClassExtendingLegacyBaseClass;
exports.ClassExtendingRename = ClassExtendingRename;

// Ensure that reexporting a goog.provided namespace handled correctly: clutz
// should use "googprovide.exporter" when defining ReexportedMissingGoogRequire
// in .d.ts.
exports.ReexportedMissingGoogRequire = MissingGoogRequire;
