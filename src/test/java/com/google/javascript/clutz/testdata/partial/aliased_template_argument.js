//!! Closure somehow doesn't properly collapse Class.typedef, aliasedtypedef, and
//!! aliasedtypedef the template type argument.  Make sure to emit types for both
//!! Class.typedef (module$exports$aliased$template$argument.typedef) and
//!! aliasedtypedef (module$contents$aliased$template$argument_aliasedtypedef),
//!! so that emitting the name of aliasedtypedef the template type argument corresponds
//!! to a defined type
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