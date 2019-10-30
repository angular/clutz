goog.module('optional.exporting.object.property');
goog.module.declareLegacyNamespace();

//!! Need to use a function to initialize optional to get around closure's
//!! type inference.
/**
 * @return {number|undefined}
 */
function getNumberOrUndefined() {}


/** @type {number|undefined} */
const optional = getNumberOrUndefined();

const exportObject = {
  optional
};

exports = exportObject;
