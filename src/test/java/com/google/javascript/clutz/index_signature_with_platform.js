goog.provide('index_signature');

/**
 * @constructor
 * @return {!index_signature.SomeType}
 */
index_signature.SomeType = function() {}

/**
 * @constructor
 * @implements {IArrayLike<index_signature.SomeType>}
 * @implements {IObject<string, index_signature.SomeType>}
 * @return {!index_signature.ImplementsIArrayLikeAndIObject}
 */
index_signature.ImplementsIArrayLikeAndIObject = function() {}

/** @type {number} */
index_signature.ImplementsIArrayLikeAndIObject.prototype.length;

/**
 * @constructor
 * @implements {IArrayLike<string>}
 * @return {!index_signature.ImplementsIArrayLike}
 */
index_signature.ImplementsIArrayLike = function() {}

/** @type {number} */
index_signature.ImplementsIArrayLike.prototype.length;

/**
 * @constructor
 * @implements {IObject<string, number>}
 * @return {!index_signature.ImplementsIObject}
 */
index_signature.ImplementsIObject = function() {}

/**
 * @constructor
 * @template T
 * @implements {IArrayLike<T>}
 * @return {!index_signature.ImplementsIArrayLikeWithGeneric}
 */
index_signature.ImplementsIArrayLikeWithGeneric = function() {}

/** @type {number} */
index_signature.ImplementsIArrayLikeWithGeneric.prototype.length;

/**
 * @constructor
 * @template T
 * @implements {IObject<string, T>}
 * @return {!index_signature.ImplementsIObjectWithGeneric}
 */
index_signature.ImplementsIObjectWithGeneric = function() {}

