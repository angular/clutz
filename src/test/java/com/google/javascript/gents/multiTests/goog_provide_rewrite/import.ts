import * as FooExports from './goog_scope';
import {InnerTypedef} from './goog_scope';
import {InnerTypedefWithAssignment} from './goog_scope';
import {Foo} from './goog_scope';

const Foo = Foo;
let a: InnerTypedef = {key: 1, value: 'bar'};
Foo.func = function(arg: InnerTypedef): InnerTypedefWithAssignment {
  return {key: 3, value: 'bar3'};
};
const b = Foo.func(a);

interface PrivateTypedef_ {
  t: InnerTypedefWithAssignment;
}