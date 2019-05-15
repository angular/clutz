function foo(...varargs: number[]) {}
foo(1,
    /* inline comment after arg, should attach to 2 */
    2, 3,
    /* ditto, should attach to 4 */
    4, 5);
foo(1,
    /* inline comment before arg, should attach to 2 */
    2);
foo(
    /* inline comment should attach to 1, not to the next line */
    1);
