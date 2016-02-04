goog.provide("aliasT.iboom");
goog.provide("aliasT.I");
goog.provide("aliasT.I2");

goog.scope(function() {
  /**
   * @interface
   * @template T
   */
  var I = function() { }
  /** @const */ aliasT.I = I;
  /** @const */ aliasT.I2 = aliasT.I;
});

//!! The cannonical type for aliasT.I<T> in closure is $jscomp.scope.I<T>.
/** @type {aliasT.I<string>} */ aliasT.iboom = null;
