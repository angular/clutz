goog.provide('foo.Bar');

/**
 * @constructor
 */
foo.Bar = function() {};

foo.Bar.prototype.baz = function() {
  Promise.resolve().then(goog.bind(function(names) {
    this.undeclaredProperty = {};
  }, this));
};
