const SimpleClass = goog.require('foo.SimpleClass');
const {a} = goog.require('foo.simpleNamespace');

// Asserting that types carry through.
var b: number = a;
// TODO(rado): this should be c: SimpleClass, but without ES6 module
// imports we cannot bring the type symbol in.
// Note that does not mean that the type won't flow through the assignment
// but simply it does not have accessible symbol in the client code.
var c = new SimpleClass();
