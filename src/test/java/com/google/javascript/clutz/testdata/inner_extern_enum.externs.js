/** @const */
var innerEnumNs = {};

/** @interface */
innerEnumNs.Foo = function() {};

/**
 * @type {!innerEnumNs.Foo.Bar}
 */
innerEnumNs.Foo.prototype.bar;

/** @enum {string} */
innerEnumNs.Foo.Bar = {
  'BAZ': 'BAZ',
};