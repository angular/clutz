/** @const */
var innerEnumNs = {};

/** @interface */
innerEnumNs.Foo = function() {};

/**
 * @type {!innerEnumNs.Foo.Bar|undefined}
 */
innerEnumNs.Foo.prototype.bar;

/** @enum {string} */
innerEnumNs.Foo.Bar = {
  'BAZ': 'BAZ',
};