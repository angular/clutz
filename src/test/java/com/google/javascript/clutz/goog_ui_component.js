goog.provide('goog.ui.Component');
goog.provide('goog.ui.Component.EventType');
goog.provide('goog.ui.tree.BaseNode');
goog.provide('goog.ui.tree.BaseNode.EventType');

/**
 * @constructor
 */
goog.ui.Component = function() {};

/**
 * @enum {string}
 */
goog.ui.Component.EventType = {
  ACTION: 'action'
};

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
goog.ui.tree.BaseNode = function() {};

/**
 * @enum {string}
 */
goog.ui.tree.BaseNode.EventType = {
  BEFORE_COLLAPSE: 'beforecollapse'
};
