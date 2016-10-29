
interface Foo {}
/** !Foo */
let foo: Foo = {};

/** string */
const x: string = 'fruit';

// TODO(#352): Support inline typing for functions.
// input: function /** string */ f(/** number */ x) {return x + ' apples'}
// output: function f(x: number): string {return x + ' apples'}
