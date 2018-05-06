import {num} from 'goog:module.exp.nodef';
let n = num;
import X from 'goog:module.exp.both';
import {num2} from 'goog:module.exp.both';
X();
n += num2;
import {foo, bar} from '../converts_ts_module_require/already_converted_to_ts_keep';
