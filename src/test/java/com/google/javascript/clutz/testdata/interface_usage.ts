import I from 'goog:interface_exp';
import E from 'goog:interface_exp.SomeEnum';
import * as ifStaticMethod from 'goog:interface_static_method';
import FunctionIf from 'goog:interface_provided_static_method.FunctionIf';

class C implements I {
    method(): number { return 0; }
}

var str: string = ifStaticMethod.FunctionIf.staticMethod();
var str2: string = FunctionIf.staticMethod();
var e: E = E.A;
