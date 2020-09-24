// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required.js
declare namespace ಠ_ಠ.clutz.googmodule {
  class Required {
    private noStructuralTyping_googmodule_Required : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required.js
declare module 'goog:googmodule.Required' {
  import Required = ಠ_ಠ.clutz.googmodule.Required;
  export default Required;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required' {
  import Required = ಠ_ಠ.clutz.googmodule.Required;
  export { Required };
  const __clutz_strip_property: 'Required';
  const __clutz_actual_namespace: 'googmodule.Required';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/goog_module.js
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$TheModule {
  class ExportedClass {
    private noStructuralTyping_module$exports$googmodule$TheModule_ExportedClass : any;
    constructor (missingClassCtor : typeof ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ) ;
    missingClassCtor : typeof ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ;
  }
  export import MissingClass = ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ;
  export import Required = ಠ_ಠ.clutz.googmodule.Required ;
  export import RequiredDefault = ಠ_ಠ.clutz.module$exports$googmodule$requiredModuleDefault ;
  let a : number ;
  export import b = ಠ_ಠ.clutz.module$exports$googmodule$requiredModule.rm ;
  function instantiateMissingClass (missingClassCtor : typeof ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ) : ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ;
  function instantiateRequiredDefault (requiredDefaultCtor : { new ( ) : module$exports$googmodule$requiredModuleDefault } ) : module$exports$googmodule$requiredModuleDefault ;
  let missingClassInstance : ಠ_ಠ.clutz.module$exports$missing$module.MissingClass ;
  let requiredDefaultInstance : module$exports$googmodule$requiredModuleDefault ;
  let requiredInstance : ಠ_ಠ.clutz.googmodule.Required ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/goog_module.js
declare module 'goog:googmodule.TheModule' {
  import TheModule = ಠ_ಠ.clutz.module$exports$googmodule$TheModule;
  export = TheModule;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/goog_module';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/goog_module' {
  import TheModule = ಠ_ಠ.clutz.module$exports$googmodule$TheModule;
  export = TheModule;
  const __clutz_actual_namespace: 'googmodule.TheModule';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required_module.js
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$requiredModule {
  let rm : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required_module.js
declare module 'goog:googmodule.requiredModule' {
  import requiredModule = ಠ_ಠ.clutz.module$exports$googmodule$requiredModule;
  export = requiredModule;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required_module';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required_module' {
  import requiredModule = ಠ_ಠ.clutz.module$exports$googmodule$requiredModule;
  export = requiredModule;
  const __clutz_actual_namespace: 'googmodule.requiredModule';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required_module_default.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$googmodule$requiredModuleDefault {
    private noStructuralTyping_module$exports$googmodule$requiredModuleDefault : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/googModule/required_module_default.js
declare module 'goog:googmodule.requiredModuleDefault' {
  import requiredModuleDefault = ಠ_ಠ.clutz.module$exports$googmodule$requiredModuleDefault;
  export default requiredModuleDefault;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required_module_default';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/googModule/required_module_default' {
  import requiredModuleDefault = ಠ_ಠ.clutz.module$exports$googmodule$requiredModuleDefault;
  export { requiredModuleDefault };
  const __clutz_strip_property: 'requiredModuleDefault';
  const __clutz_actual_namespace: 'googmodule.requiredModuleDefault';
}
