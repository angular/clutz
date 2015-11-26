goog.provide('sim_nested.Parent');
goog.provide('sim_nested.Child');

/** @constructor */
sim_nested.Parent = function() {};
/** @enum {string} */
sim_nested.Parent.Nested = {A: 'a'};

/** @constructor @extends {sim_nested.Parent} */
sim_nested.Child = function() {};
/** @enum {number} */
sim_nested.Child.Nested = {B: 12};
