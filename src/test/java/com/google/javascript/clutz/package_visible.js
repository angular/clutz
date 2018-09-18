goog.module('package_visible');

exports.MyClass = class {
  constructor() {
    /**
     * @package
     * @const
     * @type {string}
     */
    this.packageVisible = 'packageVisible';
  }
}
/** @package @type {number} */
exports.MyClass.staticPackageVisible = 1;
