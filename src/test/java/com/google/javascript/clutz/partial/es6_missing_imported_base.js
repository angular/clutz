goog.module("missing.imported.base");

const MissingGoogRequire = goog.require('default.base.exporter');

class ClassExtendingMissingRequire extends MissingGoogRequire {}

/**
 * @param {MissingGoogRequire} c
 */
function FuncWithMissingRequireParam(c) {

}

/** @type {MissingGoogRequire} */
const DeclarationOfMissingRequire = null;

const {MissingDestructuredRequire, OriginalName: RenamedDestructuredRequire} = goog.require('named.base.exporter');

class ClassExtendingMissingDestructuredRequire extends MissingDestructuredRequire {}

class ClassExtendingRenamedDestructuredRequire extends RenamedDestructuredRequire {}

const DefaultObjectExporter = goog.require('default.object.exporter');

class ClassExtendingDefaultObjectExporterBaseClass extends DefaultObjectExporter.BaseClass {}

exports.ClassExtendingMissingRequire = ClassExtendingMissingRequire;
exports.FuncWithMissingRequireParam = FuncWithMissingRequireParam;
exports.DeclarationOfMissingRequire = DeclarationOfMissingRequire;
exports.ClassExtendingMissingDestructuredRequire = ClassExtendingMissingDestructuredRequire;
exports.ClassExtendingRenamedDestructuredRequire = ClassExtendingRenamedDestructuredRequire;
exports.ClassExtendingDefaultObjectExporterBaseClass = ClassExtendingDefaultObjectExporterBaseClass;
