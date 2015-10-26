declare namespace ಠ_ಠ.clutz_internal.empty_type_args {
  interface ITemplated < T > {
  }
}
declare module 'goog:empty_type_args.ITemplated' {
  import alias = ಠ_ಠ.clutz_internal.empty_type_args.ITemplated;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.empty_type_args {
  class NoMoreTemplateArgs implements ITemplated < number > {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'empty_type_args.NoMoreTemplateArgs'): typeof ಠ_ಠ.clutz_internal.empty_type_args.NoMoreTemplateArgs;
}
declare module 'goog:empty_type_args.NoMoreTemplateArgs' {
  import alias = ಠ_ಠ.clutz_internal.empty_type_args.NoMoreTemplateArgs;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.empty_type_args {
  class X {
    constructor (a : NoMoreTemplateArgs ) ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'empty_type_args.X'): typeof ಠ_ಠ.clutz_internal.empty_type_args.X;
}
declare module 'goog:empty_type_args.X' {
  import alias = ಠ_ಠ.clutz_internal.empty_type_args.X;
  export default alias;
}
