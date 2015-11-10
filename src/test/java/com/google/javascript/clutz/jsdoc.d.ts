declare namespace ಠ_ಠ.clutz_internal.x {
  /**
   * Docs on a ctor.
   *
   * Across multiple paragraphs.
   */
  class Y {
    private noStructuralTyping_: any;
    /**
     * Docs on a ctor.
     *
     * Across multiple paragraphs.
     * @param x Ctor param.
     */
    constructor (x : number ) ;
    /**
     * Docs on a field.
     */
    field : string ;
    /**
     * Docs on a method!
     * @param foo This is a param doc.
     */
    method (foo : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'x.Y'): typeof ಠ_ಠ.clutz_internal.x.Y;
}
declare module 'goog:x.Y' {
  import alias = ಠ_ಠ.clutz_internal.x.Y;
  export default alias;
}
