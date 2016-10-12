/** @record */
const Foo = function() {}

var /** !Foo */ foo = {};

const /** string */ x = 'fruit';

// TODO(#352): Support inline typing for functions.
// input: function /** string */ f(/** number */ x) {return x + ' apples'}
// output: function f(x: number): string {return x + ' apples'}
