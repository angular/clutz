goog.module("import.binding.barrel");

goog.require("sideeffect.A.B.C");
var A = goog.require("default.A");
var X = goog.require("default.A");
const {foo} = goog.require("named.A.B");
var namespace = goog.require("namespace.A.B");
const D = goog.require("both.A.B.C.D");
const {bar} = goog.require("both.A.B.C.D");
const {foobar} = goog.require("provides");
const {R} = goog.require('module');

// Use code in JS.
const baz = foobar.A;
const bar = R.A;

// Use imports from a namespace.
namespace.foo();
namespace.bar(namespace.x);

// Use destructured import.
foo();

// Use import from a file that has both default and named exports.
const D = new D();
bar(D.x);

// Use imports with default and local names.
const aInstance = new A();
const aInstanceAsX = new X();
