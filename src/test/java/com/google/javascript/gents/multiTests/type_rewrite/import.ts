import E from 'goog:keep.E';

import * as A from './imported_module';
import {A as X} from './imported_module';
import {B} from './imported_provide';
import {foo} from './unimported_module';
import {typC} from './unimported_module';
import {D} from './unimported_provide';

let a: X = A.valA;
let b: A.typA = A.valA;
let c: X = A.valA;
let d: A.typA = A.valA;
let e: B.typB = B.valB;
let foo = function(f: foo, g: typC, h: D.typD, i: E) {};
