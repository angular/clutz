import B from 'goog:lib.B';
import X from 'goog:lib.C';

import {A} from './export';

A();
A.foo();
B();
let n = B.num + B.num;
X();
n += X.num;
