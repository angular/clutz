declare namespace ಠ_ಠ.clutz {
  /**
   * Docs on a ctor.
   *
   * Across multiple paragraphs.
   */
  class module$exports$x$Y extends module$exports$x$Y_Instance {
  }
  class module$exports$x$Y_Instance {
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
declare namespace ಠ_ಠ.clutz.module$exports$x {
  export import Y =  ಠ_ಠ.clutz.module$exports$x$Y;
}
declare module 'goog:x.Y' {
  import alias = ಠ_ಠ.clutz.module$exports$x$Y;
  export default alias;
}
