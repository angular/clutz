/**
 * @fileoverview Test cases for undefined and void.
 *
 * In Closure JavaScript, void and undefined are interchangeable, but in
 * TypeScript they are not.  In TypeScript, undefined is assignable to void, but
 * not vice-versa.  Functions that omit a return in TypeScript return void, not
 * undefined.  A function typed as returning undefined must have an explicit
 * return statement.
 *
 * We want to allow omitting return statements where possible, but we also
 * want to avoid allowing void in value types in TypeScript because of the
 * asymmetry with undefined.
 */

goog.provide('undefinedns');

/**
 * undefined as the return type of a function alias becomes void.  Void is
 * allowed because the return type is never used.
 *
 * @typedef {function():undefined}
 */
undefinedns.FuncReturnsUndefAlias;

/**
 * undefined in a union type returned by a function alias remains undefined to
 * avoid void values, but means some uses of aliases will need to explicitly
 * return undefined in TypeScript.
 *
 * @typedef {function():(number | undefined)}
 */
undefinedns.FuncReturnsUndefUnionAlias;

/**
 * A type alias for a union including undefined remains undefined.
 *
 * @typedef {boolean | undefined}
 */
undefinedns.UndefUnionAlias;

/**
 * Fields using undefined or void become optional fields.  The nullable field
 * remains a union with null.
 *
 * @typedef {{
 *   foo: (boolean | undefined),
 *   bar: (boolean | void),
 *   baz: (boolean | null),
 * }}
 */
undefinedns.UndefUnionRecord;

/**
 * A return type that includes undefined remains undefined in TS instead of
 * becoming void, because the return value of this function may be assigned to
 * a value.
 *
 * @return {undefined | string}
 */
undefinedns.funcReturnsUndefUnion = function() {};

/**
 * A function that returns undefined returns void in TypeScript.
 *
 * This is safe because the return value is unused.
 *
 * @return {undefined}
 */
undefinedns.funcReturnsUndefined = function() {};


/**
 * A function that returns void returns void in TypeScript.
 *
 * Similar to funcReturnsUndefined above.
 *
 * @return {void}
 */
undefinedns.funcReturnsVoid = function() {};

/**
 * A function parameter that matches a predefined alias is not emitted as
 * that alias, meaning it will still return undefined.
 *
 * @param {function():(number | undefined)} funcAlias
 */
undefinedns.matchesFuncAlias = function(funcAlias) {};

/**
 * A function accepting and returning a union type including undefined will
 * still return undefined in TypeScript.
 *
 * This is to avoid void values in TypeScript code.
 *
 * @param {undefinedns.UndefUnionAlias} union
 * @return {undefinedns.UndefUnionAlias}
 */
undefinedns.returnsUndefUnionAlias = function(union) {};

/**
 * A function parameter that returns a type alias that includes undefined will
 * return void in TypeScript.
 *
 * This is due to alias expansion in the emitted TypeScript code.  The
 * expanded type of the alias will have void in place of undefined, but a
 * value of the alias type can still be passed, since undefined is assignable
 * to void (but not vice-versa).
 *
 * The void return type here is safe because the function is invoked from
 * JavaScript.
 *
 * @param {function(): undefinedns.UndefUnionAlias} undefAliasFunc
 */
undefinedns.takesUndefAliasFunc = function(undefAliasFunc) {};

/**
 * A function parameter that returns undefined returns void in TypeScript.
 *
 * This is safe because the return value is unused.
 *
 * @param {function(): undefined} undefFunc
 */
undefinedns.takesUndefFunc = function(undefFunc) {};

/**
 * A record parameter with a function that returns undefined returns void in
 * TypeScript.
 *
 * This is safe for similar reasons to the above.
 *
 * @param {{func: function():undefined}} undefFuncRecord
 */
undefinedns.takesUndefFuncRecord = function(undefFuncRecord) {};

/**
 * A function that returns a union type including undefined as a parameter
 * returns void in TypeScript.
 *
 * This is safe because the function is invoked from JavaScript, not
 * TypeScript, where void is treated as undefined.
 *
 * @param {function():(string|undefined)} undefUnionFunc
 */
undefinedns.takesUndefUnionFunc = function(undefUnionFunc) {};

/**
 * A function parameter that returns void returns void in TypeScript.
 *
 * This allows passing functions that omit a return value, and is safe because
 * the return value of the parameter function is not used.
 *
 * @param {function(): void} voidFunc
 */
undefinedns.takesVoidFunc = function(voidFunc) {};

/**
 * Omitting the return type of a function causes it to return void in TS.
 *
 * @param {undefined} a
 * @param {undefined | string} b
 * @param {string=} c
 */
undefinedns.undefParamsNoReturn = function(a, b, c) {};

/**
 * Undefined values in JS become undefined in TypeScript.
 *
 * @const {undefined}
 */
undefinedns.undefProp;

/**
 * Undefined in a union value remains undefined.
 *
 * @const {undefined | string}
 */
undefinedns.undefUnionProp;

/**
 * Void values in JS become undefined in TypeScript.
 *
 * Void in JS is a synonym for undefined, but is a distinct type in TypeScript
 * that's not interchangeable with undefined values.
 *
 * @const {void}
 */
undefinedns.voidProp;

