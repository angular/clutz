goog.module('enum_alias');

const OtherEnum = goog.require('not_visible');

/** @enum {string} */
const EnumAlias = OtherEnum;

const ConstAlias = OtherEnum;

exports.EnumAlias = EnumAlias;
exports.ConstAlias = ConstAlias;
