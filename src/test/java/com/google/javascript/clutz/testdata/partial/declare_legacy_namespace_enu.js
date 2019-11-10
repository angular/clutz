// This test is the same as declare_legacy_namespace_enum.js with the
// difference that it doesn't use "enum" which is reserved keyword and triggers
// separate flow in Clutz.

goog.module('declare.legacy.namespace.enu');
goog.module.declareLegacyNamespace();

/**
 * @enum {number}
 */
const E = {
  A: 1,
  B: 2,
  C: 3
};

exports.E = E;
