goog.module("A.B.Klass");

/** Possibly outdated information about Klass. */
class Klass {

  /** @param {number} n */
  constructor(n) {
    this.n = n;

    this.x = 4;
  }

  /** @return {boolean} */
  foo() {
    return false;
  }
};

/** @return {string} */
Klass.myStaticFunction = function() {
  return ""
}

exports = Klass;
