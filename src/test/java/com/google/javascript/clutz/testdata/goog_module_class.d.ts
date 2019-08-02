declare namespace ಠ_ಠ.clutz {
  class module$exports$module$Foo {
    private noStructuralTyping_module$exports$module$Foo : any;
    constructor (x : string ,  ...rest : string [] ) ;
  }
}
declare module 'goog:module.Foo' {
  import Foo = ಠ_ಠ.clutz.module$exports$module$Foo;
  export default Foo;
}
