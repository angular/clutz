goog.provide('nsThisGenerics');

/**
 * @constructor
 * @param {TYPE} t
 * @template TYPE
 */
nsThisGenerics.GenericClass = function(t) {};

/**
 * @constructor
 */
nsThisGenerics.A = function() {};

/**
 * @return {!nsThisGenerics.GenericClass<T>}
 * @this {T}
 * @template T
 */
nsThisGenerics.A.prototype.foo = function() {
  return new nsThisGenerics.GenericClass(this);
};

/**
 * @return {nsThisGenerics.GenericClass<T> | string}
 * @this {T}
 * @template T
 */
nsThisGenerics.A.prototype.union = function() {
  return new nsThisGenerics.GenericClass(this);
};

/**
 * @return {!Array<T>}
 * @this {T}
 * @template T
 */
nsThisGenerics.A.prototype.array = function() {
  return [this];
};

/**
 * @return {!Object<string, T>}
 * @this {T}
 * @template T
 */
nsThisGenerics.A.prototype.object = function() {
  return {foo: this};
};

/**
 * @return {{foo: T}}
 * @this {T}
 * @template T
 */
nsThisGenerics.A.prototype.record = function() {
  return {foo: this};
};
