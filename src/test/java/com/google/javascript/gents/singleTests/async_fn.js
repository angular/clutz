goog.module('async.fn');

/**
 * This is testing that the keywords private/static/abstract/async are in an
 * acceptable to TS order.
 * @abstract
 */
class C {
  /**
   * @abstract
   * @protected
   * @returns {!Promise<void>}
   */
  async f() {};

  /**
   * @private
   * @returns {!Promise<void>}
   */
  async g() {};

  /**
   * @protected
   */
  static async h() {}
}

exports = C;
