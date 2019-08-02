goog.module('foo.C');

var C = goog.defineClass(null, {
  constructor: function() {},
  /**
   * @param {foo.C.Enum} a
   */
  f: function(a) {},
  statics: {
    /**
     * Test
     * @enum {string}
     */
     Enum: {
       A: '',
     }
  }
});

exports = C;