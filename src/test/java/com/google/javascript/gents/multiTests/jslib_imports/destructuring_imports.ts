import {num} from 'goog:module.exp.nodef';
let n = num;
import X from 'goog:module.exp.both';
import {num2} from 'goog:module.exp.both';
X();
n += num2;
import * as already_converted_to_ts_keep_module from '../converts_ts_module_require/already_converted_to_ts_keep';
const {foo, bar} = already_converted_to_ts_keep_module;
