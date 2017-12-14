goog.provide('goog.scope.ClassExtendingMissingGoogModuleGet');
goog.provide('goog.scope.ClassExtendingMissingDestructuredRequire');
goog.provide('goog.scope.ClassExtendingRenamedDestructuredRequire');

goog.scope(() => {
  const MissingGoogModuleGet = goog.module.get('goog.module.default.exports');
  /**
   * @constructor
   * @extends {MissingGoogModuleGet}
   */
  goog.scope.ClassExtendingMissingGoogModuleGet = function() {

  }

  const {MissingDestructuredRequire, OriginalName: RenamedDestructuredRequire} = goog.module.get('goog.module.named.exports');

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
});
