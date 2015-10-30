import C from 'goog:foo.bar.Baz';

var n: number = C.staticMethod("some");
let x = new C();
let s: string = x.field;
n = x.method("some");
let e: C.NestedEnum = C.NestedEnum.A;
e = C.NestedEnum.B;
var c: C.NestedClass = new C.NestedClass();
