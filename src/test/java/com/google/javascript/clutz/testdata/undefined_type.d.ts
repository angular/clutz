// Generated from src/test/java/com/google/javascript/clutz/testdata/undefined_type.js
declare namespace ಠ_ಠ.clutz.undefinedns {
  /**
   * undefined as the return type of a function alias becomes void.  Void is
   * allowed because the return type is never used.
   */
  type FuncReturnsUndefAlias = ( ) => void ;
  /**
   * undefined in a union type returned by a function alias remains undefined to
   * avoid void values, but means some uses of aliases will need to explicitly
   * return undefined in TypeScript.
   */
  type FuncReturnsUndefUnionAlias = ( ) => number | undefined ;
  /**
   * A type alias for a union including undefined remains undefined.
   */
  type UndefUnionAlias = boolean | undefined ;
  /**
   * Fields using undefined or void become optional fields.  The nullable field
   * remains a union with null.
   */
  type UndefUnionRecord = { bar ? : boolean , baz : boolean | null , foo ? : boolean } ;
  /**
   * A return type that includes undefined remains undefined in TS instead of
   * becoming void, because the return value of this function may be assigned to
   * a value.
   */
  function funcReturnsUndefUnion ( ) : undefined | string ;
  /**
   * A function that returns undefined returns void in TypeScript.
   *
   * This is safe because the return value is unused.
   */
  function funcReturnsUndefined ( ) : void ;
  /**
   * A function that returns void returns void in TypeScript.
   *
   * Similar to funcReturnsUndefined above.
   */
  function funcReturnsVoid ( ) : void ;
  /**
   * A function parameter that matches a predefined alias will be emitted as
   * that alias, meaning it will still return undefined.
   */
  function matchesFuncAlias (funcAlias : ಠ_ಠ.clutz.undefinedns.FuncReturnsUndefUnionAlias ) : void ;
  /**
   * A function accepting and returning a union type including undefined will
   * still return undefined in TypeScript.
   *
   * This is to avoid void values in TypeScript code.
   */
  function returnsUndefUnionAlias (union : boolean | undefined ) : boolean | undefined ;
  /**
   * A function parameter that returns a type alias that includes undefined will
   * still return undefined in TypeScript.
   *
   * This requires passing a function that explicitly returns undefined, but
   * since there's no way to know how the alias is used otherwise, it's not safe
   * to emit void.
   */
  function takesUndefAliasFunc (undefAliasFunc : ( ) => boolean | undefined ) : void ;
  /**
   * A function parameter that returns undefined returns void in TypeScript.
   *
   * This is safe because the return value is unused. Note that this matches
   * FuncReturnsUndefAlias, so that alias is used for the type in TypeScript.
   */
  function takesUndefFunc (undefFunc : ಠ_ಠ.clutz.undefinedns.FuncReturnsUndefAlias ) : void ;
  /**
   * A record parameter with a function that returns undefined returns void in
   * TypeScript.
   *
   * This is safe for similar reasons to the above.  Note that this matches the
   * FuncReturnsUndefAlias, so that alias is used in TypeScript.
   */
  function takesUndefFuncRecord (undefFuncRecord : { func : ಠ_ಠ.clutz.undefinedns.FuncReturnsUndefAlias } ) : void ;
  /**
   * A function that returns a union type including undefined as a parameter
   * returns undefined in TypeScript.
   *
   * Clutz will only emit void for functions that only return undefined, to
   * avoid having void value types.
   *
   * TODO(b/162851479): Allow void here since this function is invoked from
   * JavaScript, where the void return type is treated as undefined.
   */
  function takesUndefUnionFunc (undefUnionFunc : ( ) => string | undefined ) : void ;
  /**
   * A function parameter that returns void returns void in TypeScript.
   *
   * This allows passing functions that omit a return value, and is safe because
   * the return value of the parameter function is not used.
   */
  function takesVoidFunc (voidFunc : ಠ_ಠ.clutz.undefinedns.FuncReturnsUndefAlias ) : void ;
  /**
   * Omitting the return type of a function causes it to return void in TS.
   */
  function undefParamsNoReturn (a : undefined , b : undefined | string , c ? : string ) : void ;
  /**
   * Undefined values in JS become undefined in TypeScript.
   */
  let undefProp : undefined ;
  /**
   * Undefined in a union value remains undefined.
   */
  let undefUnionProp : undefined | string ;
  /**
   * Void values in JS become undefined in TypeScript.
   *
   * Void in JS is a synonym for undefined, but is a distinct type in TypeScript
   * that's not interchangeable with undefined values.
   */
  let voidProp : undefined ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/undefined_type.js
declare module 'goog:undefinedns' {
  import undefinedns = ಠ_ಠ.clutz.undefinedns;
  export = undefinedns;
}
