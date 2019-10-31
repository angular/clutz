/** @param {...number} varargs */
function foo(varargs) {}

foo(1, 2 /* inline comment after arg, should attach to 2 */, 3,
    4 /* ditto, should attach to 4 */, 5);

foo(1, /* inline comment before arg, should attach to 2 */ 2);

foo(1 /* inline comment should attach to 1, not to the next line */);