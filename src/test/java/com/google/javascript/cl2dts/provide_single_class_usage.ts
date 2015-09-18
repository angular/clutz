import C from 'goog:foo.bar.Baz';
import NE from 'goog:foo.bar.Baz.NestedEnum';

var n: number = C.staticMethod("some");
let x = new C();
let s: string = x.field;
n = x.method("some");
let e: C.NestedEnum = C.NestedEnum.A;
e = NE.B;
