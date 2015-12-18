declare namespace ಠ_ಠ.clutz.empty_type_args {
  interface ITemplated < T > {
  }
}
declare module 'goog:empty_type_args.ITemplated' {
  import alias = ಠ_ಠ.clutz.empty_type_args.ITemplated;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class NoMoreTemplateArgs extends NoMoreTemplateArgs_Instance {
  }
  class NoMoreTemplateArgs_Instance implements ಠ_ಠ.clutz.empty_type_args.ITemplated < number > {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'empty_type_args.NoMoreTemplateArgs'): typeof ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs;
}
declare module 'goog:empty_type_args.NoMoreTemplateArgs' {
  import alias = ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class X extends X_Instance {
  }
  class X_Instance {
    private noStructuralTyping_: any;
    constructor (a : ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs ) ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'empty_type_args.X'): typeof ಠ_ಠ.clutz.empty_type_args.X;
}
declare module 'goog:empty_type_args.X' {
  import alias = ಠ_ಠ.clutz.empty_type_args.X;
  export default alias;
}
