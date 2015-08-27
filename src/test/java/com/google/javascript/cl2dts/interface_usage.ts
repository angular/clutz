/// <reference path="./interface" />
import I from 'goog:interface_exp';
class C implements I {
    method(): number { return 0; }
}

var a: number = I.staticMethod();