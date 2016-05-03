declare namespace ಠ_ಠ.clutz.privatetype {
}
declare module 'goog:privatetype' {
  import alias = ಠ_ಠ.clutz.privatetype;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    constructor (a : any ) ;
    foo ( ) : ಠ_ಠ.clutz.PrivateType ;
  }
}
declare namespace ಠ_ಠ.clutz.privatetype.Foo {
  type typedef = { a : ಠ_ಠ.clutz.PrivateType } ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'privatetype.Foo'): typeof ಠ_ಠ.clutz.privatetype.Foo;
}
declare module 'goog:privatetype.Foo' {
  import alias = ಠ_ಠ.clutz.privatetype.Foo;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  var enumUser : ಠ_ಠ.clutz.PrivateType ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'privatetype.enumUser'): typeof ಠ_ಠ.clutz.privatetype.enumUser;
}
declare module 'goog:privatetype.enumUser' {
  import alias = ಠ_ಠ.clutz.privatetype.enumUser;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  var user : ಠ_ಠ.clutz.PrivateType ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'privatetype.user'): typeof ಠ_ಠ.clutz.privatetype.user;
}
declare module 'goog:privatetype.user' {
  import alias = ಠ_ಠ.clutz.privatetype.user;
  export default alias;
}
