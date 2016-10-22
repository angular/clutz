import B from 'goog:lib.B';
import X from 'goog:lib.C';

import * as AExports from './export';
import {A} from './export';

A();
AExports.foo();
B();
let n = B.num + B.num;
X();
n += X.num;
