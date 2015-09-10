/// <reference path="./interface" />
import I from 'goog:interface_exp';
import E from 'goog:interface_exp.SomeEnum';

class C implements I {
    method(): number { return 0; }
}

var a: number = I.staticMethod();
var e: E = E.A;
