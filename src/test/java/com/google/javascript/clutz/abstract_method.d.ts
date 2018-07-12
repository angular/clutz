declare namespace ಠ_ಠ.clutz.abstract_method {
  class Child extends Child_Instance {
  }
  class Child_Instance extends ಠ_ಠ.clutz.abstract_method.Clazz_Instance {
    bar (a : number ) : string ;
  }
}
declare module 'goog:abstract_method.Child' {
  import Child = ಠ_ಠ.clutz.abstract_method.Child;
  export default Child;
}
declare namespace ಠ_ಠ.clutz.abstract_method {
  class Clazz extends Clazz_Instance {
  }
  class Clazz_Instance implements ಠ_ಠ.clutz.abstract_method.Interface {
    private noStructuralTyping_: any;
    bar ( ...a : any [] ) : any ;
    foo ( ) : string ;
  }
}
declare module 'goog:abstract_method.Clazz' {
  import Clazz = ಠ_ಠ.clutz.abstract_method.Clazz;
  export default Clazz;
}
declare namespace ಠ_ಠ.clutz.abstract_method {
  interface Interface {
    bar (a : number ) : string ;
    foo ( ) : string ;
  }
}
declare module 'goog:abstract_method.Interface' {
  import Interface = ಠ_ಠ.clutz.abstract_method.Interface;
  export default Interface;
}
