import * as rel from './rel/module/name';
import * as rel2 from '/abs/module/name';
//!! abs_strip_for_testing is special cased in the test harness.
import * as abs from 'abs_strip_for_testing/module/name';

export let x = rel.x + abs.x + rel2.x;

//!! The emit of this file is intentionally empty.
//!! So far clutz doesn't support es6 modules properly, but the test
//!! makes sure that it doesn't reject them either.
