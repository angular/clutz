// Generated from src/test/java/com/google/javascript/clutz/testdata/base.js
declare namespace goog {
  /**
   * A debug loader is responsible for downloading and executing javascript
   * files in an unbundled, uncompiled environment.
   */
  class DebugLoader {
    private noStructuralTyping_goog_DebugLoader : any;
    protected getTranspiler ( ) : goog.Transpiler ;
  }
  class Transpiler {
    private noStructuralTyping_goog_Transpiler : any;
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
  function inherits (childCtor : ಠ_ಠ.clutz.partial.FunctionAlias , parentCtor : ಠ_ಠ.clutz.partial.FunctionAlias ) : void ;
  function isDef (val : any ) : boolean ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
  let /**
   * Reference to the global context.  In most cases this will be 'window'.
   */
  global : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/base.js
declare namespace ಠ_ಠ.clutz.goog {
  class Uri {
    private noStructuralTyping_goog_Uri : any;
  }
}
declare module 'goog:goog.Uri' {
  import Uri = ಠ_ಠ.clutz.goog.Uri;
  export default Uri;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/outputBase/function_alias_output_base.js
declare namespace ಠ_ಠ.clutz.partial {
  type FunctionAlias = Function ;
}
declare module 'goog:partial.FunctionAlias' {
  import FunctionAlias = ಠ_ಠ.clutz.partial.FunctionAlias;
  export default FunctionAlias;
}
