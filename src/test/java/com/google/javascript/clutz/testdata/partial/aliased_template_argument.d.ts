// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/aliased_template_argument.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$aliased$template$argument {
    private noStructuralTyping_module$exports$aliased$template$argument : any;
    methodWithBareArg ( ) : ಠ_ಠ.clutz.module$exports$aliased$template$argument.typedef ;
    methodWithTemplateArg ( ) : ಠ_ಠ.clutz.unknown.extern.type < ಠ_ಠ.clutz.module$exports$aliased$template$argument.typedef > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/aliased_template_argument.js
declare namespace ಠ_ಠ.clutz.module$exports$aliased$template$argument {
  type typedef = { field ? : number } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/aliased_template_argument.js
declare module 'goog:aliased.template.argument' {
  import argument = ಠ_ಠ.clutz.module$exports$aliased$template$argument;
  export default argument;
}
