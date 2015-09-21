goog.provide('lends');
goog.provide('lends.A');

/**
 * @constructor
 */
lends.A = function() {
  /** @type {string} */
  this.a = "";
};

goog.object.extend(lends.A, /** @lends {lends.A} */ {b: 1});

// lends manages to avoid the deduping of fields, and as far as closure
// is concerned there is a field a on the prototype and on the instance.
// Also the presense of @lends extends the type signature of A.prototype.
goog.object.extend(lends.A.prototype, /** @lends {lends.A.prototype} */ {a: 1, c: true});


