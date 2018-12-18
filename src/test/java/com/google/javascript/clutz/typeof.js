goog.module('type_of');

/** @const */
const obj = {};

/** @const */
obj.data = 0;

//!! If not careful, this would cause an infinite recursion.
/**
 * @return {typeof obj}
 */
obj.method = function() {
  return obj;
};

/**
 * @return {typeof obj}
 */
function externalFn() {
  return obj;
}

exports.obj = obj;
exports.externalFn = externalFn;