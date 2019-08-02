/**
 * This tests that EventTarget is expanded to module$exports$goog$events$EventTarget,
 * while processing a symbolic reference. Thus not confused with the platform global
 * EventTarget, and not rewritten to GlobalEventTarget.
 *
 * The actual goog.events.EventTarget is a goog.Provide, not a goog.Module, so its
 * clutz name is goog.events.EventTarget, but that's orthogonal to the issue that
 * it doesn't get rewritten to the global name.
 */
goog.module('platform.goog.require');

var EventTarget = goog.require('goog.events.EventTarget');

class C extends EventTarget {
}

exports.C = C;