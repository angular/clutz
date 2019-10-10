goog.provide('goog.scope.ClassExtendingMissingGoogModuleGet');
goog.provide('goog.scope.ClassExtendingMissingDestructuredRequire');
goog.provide('goog.scope.ClassExtendingRenamedDestructuredRequire');
goog.provide('goog.scope.NameAssignedToMissingGoogModuleGet');

goog.scope(() => {
  const MissingGoogModuleGet = goog.module.get('goog.module.default.exports');
  /**
   * @constructor
   * @extends {MissingGoogModuleGet}
   */
  goog.scope.ClassExtendingMissingGoogModuleGet = function() {

  }

  const namedExports = goog.module.get('goog.module.named.exports');
  const MissingDestructuredRequire = namedExports.MissingDestructuredRequire;
  const RenamedDestructuredRequire = namedExports.OriginalName;

  /**
   * @constructor
   * @extends {MissingDestructuredRequire}
   */
  goog.scope.ClassExtendingMissingDestructuredRequire = function() {

  }

  /**
   * @constructor
   * @extends {RenamedDestructuredRequire}
   */
  goog.scope.ClassExtendingRenamedDestructuredRequire = function() {

  }

  /** @const {number} */
  goog.scope.NameAssignedToMissingGoogModuleGet = namedExports.SIZE * 2;
});
