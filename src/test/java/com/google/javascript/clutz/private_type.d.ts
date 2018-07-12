declare namespace ಠ_ಠ.clutz.privatetype {
}
declare module 'goog:privatetype' {
  import privatetype = ಠ_ಠ.clutz.privatetype;
  export = privatetype;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  class Foo extends Foo_Instance {
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    constructor (a : any ) ;
    foo ( ) : PrivateType ;
  }
}
declare namespace ಠ_ಠ.clutz.privatetype.Foo {
  type typedef = { a : PrivateType } ;
}
declare module 'goog:privatetype.Foo' {
  import Foo = ಠ_ಠ.clutz.privatetype.Foo;
  export default Foo;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  class X_ extends X__Instance {
    static staticMethod ( ) : ಠ_ಠ.clutz.privatetype.X_ | null ;
  }
  class X__Instance {
    private noStructuralTyping_: any;
    method ( ) : void ;
  }
}
declare module 'goog:privatetype.X_' {
  import X_ = ಠ_ಠ.clutz.privatetype.X_;
  export default X_;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  var enumUser : PrivateType ;
}
declare module 'goog:privatetype.enumUser' {
  import enumUser = ಠ_ಠ.clutz.privatetype.enumUser;
  export default enumUser;
}
declare namespace ಠ_ಠ.clutz.privatetype {
  var user : ಠ_ಠ.clutz.privatetype.X_ ;
}
declare module 'goog:privatetype.user' {
  import user = ಠ_ಠ.clutz.privatetype.user;
  export default user;
}
