import {num} from 'goog:module.exp.nodef';
let n = num;
import X from 'goog:module.exp.both';
import {num2} from 'goog:module.exp.both';
X();
n += num2;
