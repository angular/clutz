import './export';

import * as C from './export';
import {B} from './export';
import {D} from './export';
import {E} from './export';
import {F} from './export';
import {Z as stuff} from './export';

B();
let num = C.x + C.y;
D();
D.foo();
E();
E.bar();
F();
let o = new F.G();
F.G.baz();
stuff();
stuff.fun();
