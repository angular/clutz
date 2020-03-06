goog.module('gents.inline_comments');

/** @param {...number} varargs */
function foo(varargs) {}

foo(1, 2 /* inline comment after arg, should attach to 2 */, 3,
    4 /* ditto, should attach to 4 */, 5);

foo(1, /* inline comment before arg, should attach to 2 */ 2);

foo(1 /* inline comment should attach to 1, not to the next line */);

foo(
    /* before arg1 */ 0,
    /* before arg2 but longer */ 0);

foo(
    /* on a newline above arg1 */
    0,
    /* on a newline above arg2 */
    0);


exports = {foo};
