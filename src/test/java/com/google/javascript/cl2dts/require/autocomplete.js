goog.require('goog.events.EventTarget');
goog.provide('goog.ui.ac.AutoComplete');

/**
 * @constructor
 * @param {goog.events.EventTarget} renderer
 * @extends {goog.events.EventTarget}
 */
goog.ui.ac.AutoComplete = function(renderer) {
    /**
     * @type {goog.events.EventTarget}
     * @protected
     * @suppress {underscore|visibility}
     */
    this.renderer_ = renderer;
};

/**
 * @return {goog.events.EventTarget}
 */
goog.ui.ac.AutoComplete.prototype.getRenderer = function() {
  return this.renderer_;
};