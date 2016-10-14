goog.module("import.binding.barrel");

var A = goog.require("default.A");
var X = goog.require("default.A");
const {namedExport1, namedExport2} = goog.module("named.A.B"); // TODO(#392): THIS LINE IS BROKEN
var B = goog.require("namespace.A.B");
let C = goog.require("sideeffect.A.B.C");
const D = goog.require("both.A.B.C.D");

exports = {namedExport1, X};
