goog.module('legacy.namespace.goog.define');
goog.module.declareLegacyNamespace();

/** @define {string} */
const GOOG_DEFINE = goog.define('GOOG_DEFINE', 'goog.define');

//!!TODO actually emit the legacy namespace alias for the export
exports = GOOG_DEFINE;
