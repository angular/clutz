/**
 * @fileoverview Test that Clutz handles namespaces containing keywords
 * ("delete") below.
 *
 * This must be a goog.provide, as in the module case we mangle the name before
 * emitting.
 */

goog.provide('keyword.delete.namespace');

keyword.delete.namespace.SomeClass = class {
  /** @return {string} */
  hasKeywordNamespace() {
    return 'x';
  }
};
/** @const */
keyword.delete.namespace.someConstant =
    new keyword.delete.namespace.SomeClass();
