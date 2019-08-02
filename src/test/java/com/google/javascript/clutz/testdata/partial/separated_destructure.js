goog.module("separated.destructure");

const namedBaseExporter = goog.require('named.base.exporter');

const {MissingDestructuredRequire, OriginalName: RenamedDestructuredRequire} = namedBaseExporter;
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

exports.ClassExtendingMissingDestructuredRequire = ClassExtendingMissingDestructuredRequire;
exports.ClassExtendingRenamedDestructuredRequire = ClassExtendingRenamedDestructuredRequire;
