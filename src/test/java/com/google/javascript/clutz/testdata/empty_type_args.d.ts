// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  interface ITemplated < T > {
  }
}
declare module 'goog:empty_type_args.ITemplated' {
  import ITemplated = ಠ_ಠ.clutz.empty_type_args.ITemplated;
  export default ITemplated;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class NoMoreTemplateArgs implements ಠ_ಠ.clutz.empty_type_args.ITemplated < number > {
    private noStructuralTyping_empty_type_args_NoMoreTemplateArgs : any;
  }
}
declare module 'goog:empty_type_args.NoMoreTemplateArgs' {
  import NoMoreTemplateArgs = ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs;
  export default NoMoreTemplateArgs;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class X {
    private noStructuralTyping_empty_type_args_X : any;
    constructor (a : ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs ) ;
  }
}
declare module 'goog:empty_type_args.X' {
  import X = ಠ_ಠ.clutz.empty_type_args.X;
  export default X;
}
