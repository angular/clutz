goog.provide('nested.baz.Enum');
goog.provide('nested.bar.Enum');

/** @enum */
nested.baz.Enum = {
  A: 1
};

// The output is only correct for enums with the same name.

/** @enum */
nested.bar.Enum = nested.baz.Enum;
