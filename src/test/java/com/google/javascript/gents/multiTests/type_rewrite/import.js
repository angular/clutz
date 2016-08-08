goog.module("mod");

var X = goog.require("mod.A");
goog.require("prov.B");

/** @type {X} */
var a = X.valA;
/** @type {X.typA} */
var b = X.valA;
/** @type {mod.A} */
var c = X.valA;
/** @type {mod.A.typA} */
var d = X.valA;

/** @type {prov.B.typB} */
var e = prov.B.valB;

/**
 * @param {mod.C} f
 * @param {mod.C.typC} g
 * @param {prov.D.typD} h
 * @param {keep.E} i
 */
var foo = function(f, g, h, i) {};
