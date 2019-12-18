goog.module('aliased.template.argument');

var Class = class {
  /**
   * @return {!unknown.extern.type<!aliasedtypedef>}
   */
  methodWithTemplateArg() {
  }
  /**
   * @return {!aliasedtypedef}
   */
  methodWithBareArg() {
  }
};

/**
 * @typedef {{
 *   field: (number|undefined),
 * }}
 */
Class.typedef;

/** @typedef{Class.typedef} */
var aliasedtypedef = Class.typedef;


exports = Class;
