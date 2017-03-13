goog.provide('a.b.c.Base1');
goog.provide('a.b.c.Base2');
goog.provide('a.b.c.Base3');
goog.provide('a.b.c.Base4');

goog.scope(function() {
var b = a.b;
/** @constructor */
b.c.Base1 = function() {}
});

goog.scope(function() {
var c = a.b.c;
/** @constructor */
c.Base2 = function() {}
});

goog.scope(function() {
/** @constructor */
a.b.c.Base3 = function() {}
});

goog.scope(function() {
var c = a.b.c;
var localVarNotGoogProvided = 1;
// localVarNotGoogProvided should not be exported
localVarNotGoogProvided = localVarNotGoogProvided + 1;
/** @constructor */
c.Base4 = function() {}
});
