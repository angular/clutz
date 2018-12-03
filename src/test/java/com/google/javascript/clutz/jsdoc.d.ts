declare namespace ಠ_ಠ.clutz.x {
  /**
   * Docs on a ctor.
   *
   * Across multiple paragraphs.
   */
  class Y {
    private noStructuralTyping_x_Y : any;
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
declare module 'goog:x.Y' {
  import Y = ಠ_ಠ.clutz.x.Y;
  export default Y;
}
