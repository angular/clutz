declare namespace ಠ_ಠ.clutz.googmodule {
  class Required extends Required_Instance {
  }
  class Required_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:googmodule.Required' {
  import Required = ಠ_ಠ.clutz.googmodule.Required;
  export default Required;
}
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$TheModule {
  var a : number ;
  var b : number ;
  var required : ಠ_ಠ.clutz.googmodule.Required ;
  var requiredDefault : module$exports$googmodule$requiredModuleDefault ;
}
declare module 'goog:googmodule.TheModule' {
  import TheModule = ಠ_ಠ.clutz.module$exports$googmodule$TheModule;
  export = TheModule;
}
declare namespace ಠ_ಠ.clutz.module$exports$googmodule$requiredModule {
  var rm : number ;
}
declare module 'goog:googmodule.requiredModule' {
  import requiredModule = ಠ_ಠ.clutz.module$exports$googmodule$requiredModule;
  export = requiredModule;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$googmodule$requiredModuleDefault extends module$exports$googmodule$requiredModuleDefault_Instance {
  }
  class module$exports$googmodule$requiredModuleDefault_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:googmodule.requiredModuleDefault' {
  import requiredModuleDefault = ಠ_ಠ.clutz.module$exports$googmodule$requiredModuleDefault;
  export default requiredModuleDefault;
}
