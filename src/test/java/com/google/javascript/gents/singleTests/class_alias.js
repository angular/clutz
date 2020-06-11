goog.provide('classalias.C');

goog.scope(function() {
/** @constructor */
classalias.C = goog.defineClass(null, {
  f: function() {
    return C.x;
  },
  statics: {x: ''}
});
var C = classalias.C;
});
