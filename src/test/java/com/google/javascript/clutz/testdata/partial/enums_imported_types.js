goog.module('enums.imported.types');

const {ImportedEnum} = goog.require('other.enums');

/** @record */
const Config = function() {};

/** @type {?SubEnum|undefined} */
Config.prototype.source;

/**
 * @enum {ImportedEnum}
 */
const SubEnum = {
  CUSTOM: ImportedEnum.CUSTOM,
  AUTO: ImportedEnum.AUTO,
  TESTING: ImportedEnum.TESTING,
};

exports = {
  Config,
  SubEnum,
};
