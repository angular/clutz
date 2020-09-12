goog.module('subclass.prop');

class Base {
  constructor() {
    /** @type {string} */
    this.a = '';
  }
}

class D extends Base {
  /**
   * @param {string} a
   */
  constructor(a) {
    super();
    // D overwrites a property coming from the base class.
    this.a = a + '!!!';
  }
}

exports = {D, Base};
