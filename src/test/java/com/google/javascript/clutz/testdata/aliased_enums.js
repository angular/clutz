goog.provide('nested.baz.Enum');
goog.provide('nested.bar.HahaEnum');
goog.provide('nested.bar.ConstAliasEnum');

/** @enum */
nested.baz.Enum = {
  A: 5
};

/** @enum */
nested.bar.HahaEnum = nested.baz.Enum;


/** @const */
nested.bar.ConstAliasEnum = nested.baz.Enum;
