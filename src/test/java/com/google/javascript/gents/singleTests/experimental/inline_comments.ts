
export function foo(...varargs: number[]) {}

foo(1,       /* inline comment after arg, should attach to 2 */
    2, 3, 4, /* ditto, should attach to 4 */
    5);

foo(1, /* inline comment before arg, should attach to 2 */
    2);

foo(/* inline comment should attach to 1, not to the next line */
    1);

foo(0, /* before arg1 */
    0);
/* before arg2 but longer */

foo(
    /* on a newline above arg1 */
    0,
    /* on a newline above arg2 */
    0);
