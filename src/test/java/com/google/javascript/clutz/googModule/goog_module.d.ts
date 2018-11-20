declare namespace ಠ_ಠ.clutz.googmodule {
  class Required {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:googmodule.Required' {
  import Required = ಠ_ಠ.clutz.googmodule.Required;
  export default Required;
}
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$TheModule {
  let a : number ;
  let b : number ;
  let required : ಠ_ಠ.clutz.googmodule.Required ;
  let requiredDefault : module$exports$googmodule$requiredModuleDefault ;
}
declare module 'goog:googmodule.TheModule' {
  import TheModule = ಠ_ಠ.clutz.module$exports$googmodule$TheModule;
  export = TheModule;
}
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$requiredModule {
  let rm : number ;
}
declare module 'goog:googmodule.requiredModule' {
  import requiredModule = ಠ_ಠ.clutz.module$exports$googmodule$requiredModule;
  export = requiredModule;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$googmodule$requiredModuleDefault {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:googmodule.requiredModuleDefault' {
  import requiredModuleDefault = ಠ_ಠ.clutz.module$exports$googmodule$requiredModuleDefault;
  export default requiredModuleDefault;
}
