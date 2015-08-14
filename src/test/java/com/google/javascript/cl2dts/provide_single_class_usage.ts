/// <reference path="./provide_single_class"/>
import C from 'goog:foo.bar.Baz';
var n: number = C.staticMethod("some");
let x = new C();
let s: string = x.field;
n = x.method("some");
