goog.require("goog.provide.exporter.ProvideClass");
goog.require("goog.multi.provide.exporter.FirstMultiProvideClass");
goog.require("goog.multi.provide.exporter.SecondMultiProvideClass");
goog.provide("goog.provide.importer.GClass");
goog.provide("goog.provide.importer.HClass");
goog.provide("goog.provide.importer.IClass");
goog.provide("goog.provide.importer.JClass");
goog.provide("goog.provide.importer.KClass");

/**
 * @constructor
 * @extends {goog.provide.exporter.ProvideClass}
 */
goog.provide.importer.GClass = function() {};

/**
 * @constructor
 * @extends {goog.multi.provide.exporter.FirstMultiProvideClass}
 */
goog.provide.importer.HClass = function() {};
/**
 * @constructor
 * @extends {goog.multi.provide.exporter.SecondMultiProvideClass}
 */
goog.provide.importer.IClass = function() {};

goog.scope(function() {
  const DefaultClass = goog.module.get("goog.module.default.exporter");
  /**
   * @constructor
   * @extends {DefaultClass}
   */
  goog.provide.importer.JClass = function() {};

  const Named = goog.module.get("goog.module.named.exporter");
  /**
   * @constructor
   * @extends {Named.NamedClass}
   */
  goog.provide.importer.KClass = function() {}
});
