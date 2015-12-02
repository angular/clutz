goog.provide('sim_nested.Parent');
goog.provide('sim_nested.Child');

// Providing inner enums is against Closures' style guide, but yet a common pattern in
// client code.
goog.provide('sim_nested.Parent.NestedAndProvided');
goog.provide('sim_nested.Child.NestedAndProvided');

/** @constructor */
sim_nested.Parent = function() {};
/** @enum {string} */
sim_nested.Parent.Nested = {A: 'a'};
/** @enum {string} */
sim_nested.Parent.NestedAndProvided = {A: 'a'};

/** @constructor @extends {sim_nested.Parent} */
sim_nested.Child = function() {};
/** @enum {number} */
sim_nested.Child.Nested = {B: 12};
/** @enum {number} */
sim_nested.Child.NestedAndProvided = {B: 12};
