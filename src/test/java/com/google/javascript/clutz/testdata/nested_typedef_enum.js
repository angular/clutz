goog.provide('nested_typedef_enum.Bar');
goog.provide('nested_typedef_enum.Bar.Baz');

/** @typedef {{a: string}} */
nested_typedef_enum.Bar;

/** @enum {number} */
nested_typedef_enum.Bar.Baz = {A: 1};
