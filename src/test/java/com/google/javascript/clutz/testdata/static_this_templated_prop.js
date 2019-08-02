goog.provide('static_this_templated_prop');

/**
 * Some container to hold the static property.
 * @constructor
 */
static_this_templated_prop.SomeContainer = function() {}

/**
 * @template SCOPE
 * @this SCOPE
 */
static_this_templated_prop.SomeContainer.nestedClass = function() {};

