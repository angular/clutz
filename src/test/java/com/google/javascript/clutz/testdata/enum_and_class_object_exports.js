/**
 * @fileoverview This file contains the mapping of dynamic components to their
 * names.
 */
goog.module('foo.bar');
goog.module.declareLegacyNamespace();

const ExportObject = {};

/** @enum {string} */
ExportObject.Enum = {
  A: 'A'
};

class Class {}

ExportObject.Class = class {};

/** @const */
exports = ExportObject;