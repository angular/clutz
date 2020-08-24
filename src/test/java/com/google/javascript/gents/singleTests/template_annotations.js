goog.module('gents.jsdoc.template');

/**
 * @template
 */
class InvalidAnnotation {}

/**
 * @template A_LONG_NAME
 */
class SimpleGenericClass {
  /**
   * @param {A_LONG_NAME} x
   */
  getType(x) {
    return typeof x;
  }
}

class ClassA {}

/**
 * Some comment
 * @public
 * @abstract
 * @template T, K
 */
class SingleInheritance extends ClassA {}

/**
 * @template SOME_OTHER_NAME, A_LONG_NAME
 * @extends {SimpleGenericClass<A_LONG_NAME>}
 */
class CorrectTemplateVars extends SimpleGenericClass {}

/**
 * @extends {SimpleGenericClass<string>}
 */
class CorrectUseOfConcreteType extends SimpleGenericClass {}

/**
 * @extends {SimpleGenericClass<string|number>}
 */
class CorrectUseOfConcreteCompoundType extends SimpleGenericClass {}

/**
 * TODO(lukemizuhashi): Investigate parent classes and interfaces in G3 ES6
 * annotated with @interface and @template annotations.
 * Also, address implements annotations.
 * @interface
 * @template VALUE
 */
class Interface {}

/**
 * @abstract
 */
class HasGenericMethods {
  /**
   * @template T, U
   * @return {void}
   */
  genericMethod() {}

  /**
   * @template T, U
   * @abstract
   */
  abstractGenericMethod() {}
}

/**
 * @template T, U
 * @param {T} t
 * @param {U} u
 * @return {T}
 */
function genericFn(t, u) {
  return t;
}

exports = {
  InvalidAnnotation,
  SimpleGenericClass,
  SingleInheritance,
  MismatchedTemplateVars,
  MissingTemplateAnnotation,
  CorrectTemplateVars,
  CorrectUseOfConcreteType,
  CorrectUseOfConcreteCompoundType,
  Interface,
  HasGenericMethods,
  genericFn,
};
