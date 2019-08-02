import * as ns from 'goog:nsThisGenerics';

class B extends ns.A {}
const b = new B();
const ba: B[] = b.array();
const bf: ns.GenericClass<B> = b.foo();
const bo: {[key: string]: B} = b.object();
const br: {foo: B} = b.record();
const bu: ns.GenericClass <B> | null | string = b.union();

