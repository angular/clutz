goog.provide('goog.debug');


//!! In the closure library, one file debug/debug.js - goog.provides('goog.debug'),
//!! another debug/logger goog.provides('goog.debug.Logger').
//!!
//!! We have some workaround so that every incremental clutz run knows that
//!! there exists a goog.debug.Logger. However, extra caution is needed to
//!! make sure that goog.debug.Logger does not appear in the base debug/debug.js
//!! file emit.
//!!
//!! Emitting goog.debug.Logger in two .d.ts files causes conflicts.

/** @const */
goog.debug = {foo: 0};