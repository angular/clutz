goog.provide('nested.baz.Enum');
goog.provide('nested.bar.HahaEnum');

/** @enum */
nested.baz.Enum = {
  A: 1
};

/** @enum */
nested.bar.HahaEnum = nested.baz.Enum;
