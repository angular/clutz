goog.module('protected');

exports.MyClass = class {
  constructor() {
    /**
     * @protected
     * @const
     * @type {string}
     */
    this.protectedVisibility = 'protectedVisibility';
  }
}
/** @protected @type {number} */
exports.MyClass.staticProtected = 1;
