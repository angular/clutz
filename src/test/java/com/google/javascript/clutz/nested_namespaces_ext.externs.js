/** @const */
var nestedNs;

/**
 * This should be @const but this pattern is still used :/
 * @type {Object}
 */
nestedNs.subNamespace = {};

/** @type {string} */
nestedNs.subNamespace.fieldA = '';

/** @type {number} */
nestedNs.subNamespace.fieldB = 0;

/**
 * @const
 */
nestedNs.constNs = {};

/** @type {number} */
nestedNs.constNs.a = 0;