declare namespace ಠ_ಠ.clutz.module$exports$missing$base$union {
  //!! The double extends here is a bug too.
  interface Derived extends ಠ_ಠ.clutz.module$exports$some$base.Base extends ಠ_ಠ.clutz.module$exports$some$base.Base {
    someField ? : string ;
  }
  /**
   * This is currently broken and we are waiting on a fix in Closure, since it
   * cannot be simply fixed in Clutz.
   *
   * Right now, only a is emitted correctly, because it is not an union with
   * null or undefined, the rest are collapsed into null or undefined, without a
   * mention of Derived.
   */
  function fn (a : ಠ_ಠ.clutz.module$exports$missing$base$union.Derived , b : null , c ? : undefined ) : void ;
}
declare module 'goog:missing.base.union' {
  import union = ಠ_ಠ.clutz.module$exports$missing$base$union;
  export = union;
}
