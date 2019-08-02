goog.provide('implements_iterable.ImplIterable');
goog.provide('implements_iterable.ImplIterableGeneric');
goog.provide('implements_iterable.ImplIterableIterator');

/**
 * @constructor
 * @implements {Iterable<string>}
 */
implements_iterable.ImplIterable = function() {};

/** @override @final */
implements_iterable.ImplIterable.prototype[Symbol.iterator] = function() {
  return new implements_iterable.ImplIterableIterator();
};


/**
 * @constructor
 * @template T
 * @implements {Iterable<T>}
 */
implements_iterable.ImplIterableGeneric = function() {};

/** @override @final */
implements_iterable.ImplIterable.prototype[Symbol.iterator] = function() {
  return new implements_iterable.ImplIterableIterator();
};

/**
 * @constructor
 * @implements {IteratorIterable<string>}
 */
implements_iterable.ImplIterableIterator = function() {};

/**
 * @return {!IIterableResult<string>}
 */
implements_iterable.ImplIterableIterator.prototype.next = function() {
  return {done: false, value: 'infinite!'};
};
