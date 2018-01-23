declare namespace goog {
  /**
   * A debug loader is responsible for downloading and executing javascript
   * files in an unbundled, uncompiled environment.
   */
  class DebugLoader extends DebugLoader_Instance {
  }
  class DebugLoader_Instance {
    private noStructuralTyping_: any;
    getTranspiler ( ) : goog.Transpiler ;
  }
  class Transpiler extends Transpiler_Instance {
  }
  class Transpiler_Instance {
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
  function inherits (childCtor : ಠ_ಠ.clutz.module$exports$partial$FunctionAlias , parentCtor : ಠ_ಠ.clutz.module$exports$partial$FunctionAlias ) : void ;
  function isDef (val : any ) : boolean ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
  var /**
   * Reference to the global context.  In most cases this will be 'window'.
   */
  global : any ;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$goog$Uri extends module$exports$goog$Uri_Instance {
  }
  class module$exports$goog$Uri_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$goog {
  export import Uri = ಠ_ಠ.clutz.module$exports$goog$Uri;
}
declare module 'goog:goog.Uri' {
  import alias = ಠ_ಠ.clutz.module$exports$goog$Uri;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$partial$FunctionAlias = Function ;
}
declare namespace ಠ_ಠ.clutz.module$exports$partial {
  export import FunctionAlias = ಠ_ಠ.clutz.module$exports$partial$FunctionAlias;
}
declare module 'goog:partial.FunctionAlias' {
  import alias = ಠ_ಠ.clutz.module$exports$partial$FunctionAlias;
  export default alias;
}
