import {C} from './unimported_module';
import {typC} from './unimported_module';
import {typD} from './unimported_provide';

export {};

import E from 'goog:keep.E';
import {A as X} from './imported_module';
import * as A from './imported_module';
import * as B from './imported_provide';
let a: X = A.valA;
let b: A.typA = A.valA;
let c: X = A.valA;
let d: A.typA = A.valA;
let e: B.typB = B.valB;
let foo = function(f: C, g: typC, h: typD, i: E) {};
