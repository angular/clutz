/**
 * This tests that EventTarget is expanded to goog.events.EventTarget, while processing a
 * symbolic reference. Thus not confused with the platform global EventTarget, and not rewritten
 * to GlobalEventTarget.
 *
 * All tests in partial add goog.events.EventTarget as a knownGoogRequire.
 */
goog.module('platform.goog.require');

var EventTarget = goog.require('goog.events.EventTarget');

class C extends EventTarget {
}

exports.C = C;