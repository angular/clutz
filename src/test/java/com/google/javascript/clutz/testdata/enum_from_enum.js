goog.provide('enum_from_enum.Bar.bar.GoodEnum');
goog.provide('enum_from_enum.Foo.foo.DeprecatedEnum');

/** @enum {number} */
enum_from_enum.Bar.bar.GoodEnum = {
  FOO: 1,
  BAR: 2
};

/**
 * @enum {number}
 * @deprecated Use {@link enum_from_enum.Bar.bar.GoodEnum} instead.
 */
enum_from_enum.Foo.foo.DeprecatedEnum = enum_from_enum.Bar.bar.GoodEnum;
