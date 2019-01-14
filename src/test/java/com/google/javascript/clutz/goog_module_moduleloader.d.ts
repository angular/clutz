declare namespace ಠ_ಠ.clutz.goog {
  function module (a : string ) : void ;
}
declare module 'goog:goog.module' {
  import module = ಠ_ಠ.clutz.goog.module;
  export default module;
}
declare namespace ಠ_ಠ.clutz.goog.module {
  class ModuleLoader {
    private noStructuralTyping_goog_module_ModuleLoader : any;
  }
}
declare namespace ಠ_ಠ.clutz.goog.module.ModuleLoader {
  class EvaluateCodeEvent {
    private noStructuralTyping_goog_module_ModuleLoader_EvaluateCodeEvent : any;
  }
}
declare module 'goog:goog.module.ModuleLoader' {
  import ModuleLoader = ಠ_ಠ.clutz.goog.module.ModuleLoader;
  export default ModuleLoader;
}
