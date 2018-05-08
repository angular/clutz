goog.module("A.B.Klass");

/** Possibly outdated information about Klass. */
class Klass {

  /** 
   * @param {number} n
   * @param {Array<?>} list
   */
  constructor(n, list = []) {
    this.n = n;
    
    /** @const {Array<?>} */
    this.list = list;
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
