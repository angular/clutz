import switchAlias from 'goog:ns.reserved.switch';
import a from 'goog:ns.reserved.a';

var f: (a: number, b: number) => number = (a, b) => a + b;
f(switchAlias, a);