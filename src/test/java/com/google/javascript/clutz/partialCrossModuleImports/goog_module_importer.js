goog.module("goog.module.importer");

const ProvideClass = goog.require("goog.provide.exporter.ProvideClass");
const DefaultClass = goog.require("goog.module.default.exporter");
const {NamedClass} = goog.require("goog.module.named.exporter");

/**
 * @constructor
 * @extends {ProvideClass}
 */
function DClass() {}

/**
 * @constructor
 * @extends {DefaultClass}
 */
function EClass() {}

/**
 * @constructor
 * @extends {NamedClass}
 */
function FClass() {}

exports.DClass = DClass;
exports.EClass = EClass;
exports.FClass = FClass;
