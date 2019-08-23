goog.module('enum_alias');

const OtherEnum = goog.require('not_visible');

/** @enum {string} */
const Enum = OtherEnum;

exports = Enum;
