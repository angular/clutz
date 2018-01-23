goog.provide('foo.bar.Class');

/**
 * @constructor
 */
foo.bar.Class = function() {
};

//!! The method param references to foo.bar.Class should be renamed to
//!!  goog.module/dollar style, to match the rename of the class
/**
 * @param {foo.bar.Class} c1
 * @param {foo.bar.Class} c2
 * @return {boolean}
 */
foo.bar.Class.equals = function(c1, c2) {
  return true;
};
