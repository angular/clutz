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
  function inherits (childCtor : Function , parentCtor : Function ) : void ;
  function isDef (val ? : any ) : boolean ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
  let global : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/base.js
declare namespace ಠ_ಠ.clutz.goog {
  class Uri {
    private noStructuralTyping_goog_Uri : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/base.js
declare module 'goog:goog.Uri' {
  import Uri = ಠ_ಠ.clutz.goog.Uri;
  export default Uri;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/base';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/base' {
  import Uri = ಠ_ಠ.clutz.goog.Uri;
  export { Uri };
  const __clutz_strip_property: 'Uri';
  const __clutz_actual_namespace: 'goog.Uri';
}
