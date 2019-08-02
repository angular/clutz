goog.provide('index_signature');

/**
 * @constructor
 */
index_signature.SomeType = function() {}

/**
 * @constructor
 * @implements {IArrayLike<string>}
 */
index_signature.ImplementsIArrayLike = function() {}

/** @type {number} */
index_signature.ImplementsIArrayLike.prototype.length;

/**
 * @constructor
 * @implements {IObject<string, number>}
 */
index_signature.ImplementsIObject = function() {}

/**
 * @constructor
 * @template T
 * @implements {IArrayLike<T>}
 */
index_signature.ImplementsIArrayLikeWithGeneric = function() {}

/** @type {number} */
index_signature.ImplementsIArrayLikeWithGeneric.prototype.length;

/**
 * @constructor
 * @template T
 * @implements {IObject<string, T>}
 */
index_signature.ImplementsIObjectWithGeneric = function() {}

/**
 * @constructor
 * @extends {index_signature.ImplementsIArrayLike}
 */
index_signature.ShouldNotContainIndexSignature = function() {}

/**
 * @interface
 * @extends {IArrayLike<string>}
 */
index_signature.InterfaceExtendingIArrayLike = function() {};

/**
 * @constructor
 * @implements {index_signature.InterfaceExtendingIArrayLike}
 */
index_signature.ShouldContainIndexSignature = function() {}

/** @type {number} */
index_signature.ShouldContainIndexSignature.prototype.length;

/**
 * @constructor
 * @implements {IArrayLike}
 */
index_signature.ImplementsIArrayLikeBare = function() {};

/** @type {number} */
index_signature.ImplementsIArrayLikeBare.prototype.length;

/**
 * @constructor
 * @implements {IObject}
 */
index_signature.ImplementsIObjectLikeBare = function() {};
