import X from 'goog:module.exp.both';
import Y from 'goog:module.exp.def';
import * as Z from 'goog:module.exp.nodef';
X();
let n = X.num;
Y();
n += Z.num;
