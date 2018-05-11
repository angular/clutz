goog.provide('inferred.nested.obj');

//!! Because of the provides inferred.nested.obj will be turned into a 'declare namespace'
//!! while nestedObj is simply a var with an object literal type.
//!! This changes what can we do with the quoted properties. For the namespace we skip
//!! the invalid ones, while for the object literal type we simply quote them.

/** @const */
inferred.nested.obj = {
  regular: 0,
  'quotedProp': 1,
  '0123': 2,
  'must-be-quoted': 3,
  //!! TODO(radokirov): Add 'has.comma.bad' prop and fix issues.
  nestedObj: {
    regular: 0,
    'quoted': 1,
    '0123': 2,
    'must-be-quoted': 3
  }
};