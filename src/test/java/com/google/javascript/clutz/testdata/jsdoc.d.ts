// Generated from src/test/java/com/google/javascript/clutz/testdata/jsdoc.js
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
     * Docs on a deprecated method.
     * @param foo This is a param doc.
     * @deprecated
     */
    deprecatedMethod1 (foo : string ) : void ;
    /**
     * Docs on a deprecated method, with a reason.
     * @param foo This is a param doc.
     * @deprecated This is really deprecated - do not use!
     */
    deprecatedMethod2 (foo : string ) : void ;
    /**
     * Docs on a method!
     * @param foo This is a param doc.
     */
    method (foo : string ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/jsdoc.js
declare module 'goog:x.Y' {
  import Y = ಠ_ಠ.clutz.x.Y;
  export default Y;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/jsdoc';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/jsdoc' {
  import Y = ಠ_ಠ.clutz.x.Y;
  export { Y };
  const __clutz_strip_property: 'Y';
  const __clutz_actual_namespace: 'x.Y';
}
