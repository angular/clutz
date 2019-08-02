/** @constructor */
var ExternStaticC = function() {};

/** @const */
ExternStaticC.ns = {};

/** @type {number} */
ExternStaticC.ns.a = 0;

/** @type {!Object<string, ?>} */
ExternStaticC.objNsLike = {};

/** @type {string} */
ExternStaticC.objNsLike.a;

/** @type {{foo: string}}} */
ExternStaticC.literal;

/** @type {string} */
ExternStaticC.objNsLike.a;

/** @type {function(string):string} */
ExternStaticC.fn;

/** @type {string} */
ExternStaticC.fn.a;