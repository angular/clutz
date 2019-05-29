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
  function isArray (val : any ) : val is any[]  ;
  function isBoolean (val : any ) : val is boolean  ;
  function isDef <T> (val : T ) : val is Exclude<T, undefined>  ;
  function isDefAndNotNull <T> (val : T ) : val is NonNullable<T>  ;
  function isFunction (val : any ) : val is Function  ;
  function isNull (val : any ) : val is null  ;
  function isNumber (val : any ) : val is number  ;
  function isObject (val : any ) : val is Object  ;
  function isString (val : any ) : val is string  ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
  let /**
   * Reference to the global context.  In most cases this will be 'window'.
   */
  global : any ;
}
declare namespace ಠ_ಠ.clutz.goog {
  class Uri {
    private noStructuralTyping_goog_Uri : any;
  }
}
declare module 'goog:goog.Uri' {
  import Uri = ಠ_ಠ.clutz.goog.Uri;
  export default Uri;
}
