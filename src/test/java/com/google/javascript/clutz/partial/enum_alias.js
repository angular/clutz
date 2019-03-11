goog.module('enum_alias');

const OtherEnum = goog.require('not_visible');

//!! This test is temporary turned off to enable
//!! change in behavior on closure side.
//!! /** @enum {string} */
const Enum = OtherEnum;

exports = Enum;
