goog.module('circular.obj');

/** @const */
let obj = {
  a: 0,
  z: 0
};

//!! What's the purpose of that is beyond me, but it happens in real code
//!! https://github.com/mixmaxhq/tasty-treewalker/blob/master/src/TreeWalker-polyfill.js#L35
//!! Note: that closure knows that `prototype` is special, but constructor shows
//!! in the type as regular prop.
obj.constructor = obj.prototype = obj;

/** @const */
let deepObj = {
  a: 0,
  z: 0
};

/** @const */
deepObj.child = {cycle: deepObj};

exports.obj = obj;
exports.deepObj = deepObj;