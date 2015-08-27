goog.provide('typesWithExterns');


/**
 * @return {Element}
 */
typesWithExterns.elementMaybe = function() {return null};

// browser externs extend the Object prototype with hasOwnProperty, etc. This tests that we
// do not output them as TS will support them as part of lib.d.ts.
/** @type {{a: number}} */
typesWithExterns.a = {a: 3};