goog.provide('ns.event');

//!! Assume there exists a ns.event.EventTarget, then
//!! emitting just t: EventTarget would be wrong.
//!! TypeScript will pick up ns.event.EventTarget instead
//!! of the global EventTarget.
/** @param {EventTarget} t */
ns.event.f = function(t) {};

//!! In contrast, this function uses the namespace local EventTarget.
/** @param {ns.event.EventTarget} t */
ns.event.f2 = function(t) {};