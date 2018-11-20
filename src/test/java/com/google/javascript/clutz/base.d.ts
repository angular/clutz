declare namespace goog {
  /**
   * A debug loader is responsible for downloading and executing javascript
   * files in an unbundled, uncompiled environment.
   */
  class DebugLoader {
    private noStructuralTyping_: any;
    protected getTranspiler ( ) : goog.Transpiler ;
  }
  class Transpiler {
    private noStructuralTyping_: any;
  }
  /**
   * Exports a property unobfuscated into the object's namespace.
   * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
   * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
   * @param object Object whose static property is being exported.
   * @param publicName Unobfuscated name to export.
   * @param symbol Object the name should point to.
   */
  function exportProperty (object : ಠ_ಠ.clutz.GlobalObject | null , publicName : string , symbol : any ) : void ;
  function inherits (childCtor : Function , parentCtor : Function ) : void ;
  function isDef (val : any ) : boolean ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
  let /**
   * Reference to the global context.  In most cases this will be 'window'.
   */
  global : any ;
}
declare namespace ಠ_ಠ.clutz.goog {
  class Uri {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:goog.Uri' {
  import Uri = ಠ_ಠ.clutz.goog.Uri;
  export default Uri;
}
