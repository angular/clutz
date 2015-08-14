/// <reference path="./fn_params" />
import {optional, optionalNullable, varargs} from 'goog:fn_params';
let n1: number = optional("this");
let n2: number = optionalNullable("that");
varargs("other", 1, 2, 3);