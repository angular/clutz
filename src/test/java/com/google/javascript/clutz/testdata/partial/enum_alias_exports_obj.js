goog.module('enum_alias');

const OtherEnum = goog.require('not_visible');
const mod = goog.require('not_visible_mod');

/** @const */
const EnumAlias = OtherEnum;

const ConstAlias = OtherEnum;

const ConstModAlias = mod.ModEnum;

exports = {EnumAlias, ConstAlias, ConstModAlias};
