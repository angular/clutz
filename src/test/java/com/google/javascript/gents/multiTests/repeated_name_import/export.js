goog.module('exporting.C');

class A {}

// This test is testing the case where the exported class is also repeated in
// the name of the module. Here we export C from exporting.C.
class C {}

exports.A = A;
exports.C = C;
