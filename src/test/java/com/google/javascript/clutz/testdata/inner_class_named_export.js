goog.module('innerclass.namedexport');

class A {}

A.B = class {};

A.B.C = class {};

exports = {A};