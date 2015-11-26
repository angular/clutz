declare namespace ಠ_ಠ.clutz.abstract_method {
  class Child extends ಠ_ಠ.clutz.abstract_method.Clazz {
    bar (a : number ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'abstract_method.Child'): typeof ಠ_ಠ.clutz.abstract_method.Child;
}
declare module 'goog:abstract_method.Child' {
  import alias = ಠ_ಠ.clutz.abstract_method.Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.abstract_method {
  class Clazz implements ಠ_ಠ.clutz.abstract_method.Interface {
    private noStructuralTyping_: any;
    //!! In Closure, abstract methods are just methods that have type Function, which corresponds
    //!! to a TS method that takes any arguments and returns any. Luckily this is compatible for
    //!! both the super and the subtype.
    bar ( ...a : any [] ) : any ;
    foo ( ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'abstract_method.Clazz'): typeof ಠ_ಠ.clutz.abstract_method.Clazz;
}
declare module 'goog:abstract_method.Clazz' {
  import alias = ಠ_ಠ.clutz.abstract_method.Clazz;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.abstract_method {
  interface Interface {
    bar (a : number ) : string ;
    foo ( ) : string ;
  }
}
declare module 'goog:abstract_method.Interface' {
  import alias = ಠ_ಠ.clutz.abstract_method.Interface;
  export default alias;
}
