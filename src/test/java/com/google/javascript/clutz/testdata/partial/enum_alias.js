goog.module('enum_alias');

const OtherEnum = goog.require('not_visible');
const mod = goog.require('not_visible_mod');

/** @enum {string} */
const EnumAlias = OtherEnum;

const ConstAlias = OtherEnum;

const ConstModAlias = mod.ModEnum;

exports.EnumAlias = EnumAlias;
exports.ConstAlias = ConstAlias;
exports.ConstModAlias = ConstModAlias;
