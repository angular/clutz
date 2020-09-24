// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  interface ITemplated < T = any > {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare module 'goog:empty_type_args.ITemplated' {
  import ITemplated = ಠ_ಠ.clutz.empty_type_args.ITemplated;
  export default ITemplated;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/empty_type_args';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/empty_type_args' {
  import ITemplated = ಠ_ಠ.clutz.empty_type_args.ITemplated;
  export { ITemplated };
  const __clutz_strip_property: 'ITemplated';
  const __clutz_actual_namespace: 'empty_type_args.ITemplated';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class NoMoreTemplateArgs implements ಠ_ಠ.clutz.empty_type_args.ITemplated < number > {
    private noStructuralTyping_empty_type_args_NoMoreTemplateArgs : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare module 'goog:empty_type_args.NoMoreTemplateArgs' {
  import NoMoreTemplateArgs = ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs;
  export default NoMoreTemplateArgs;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/empty_type_args' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare namespace ಠ_ಠ.clutz.empty_type_args {
  class X {
    private noStructuralTyping_empty_type_args_X : any;
    constructor (a : ಠ_ಠ.clutz.empty_type_args.NoMoreTemplateArgs ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/empty_type_args.js
declare module 'goog:empty_type_args.X' {
  import X = ಠ_ಠ.clutz.empty_type_args.X;
  export default X;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/empty_type_args' {
  export {};
  const __clutz_multiple_provides: true;
}
