// Generated from src/test/java/com/google/javascript/clutz/testdata/abstract_method.js
declare namespace ಠ_ಠ.clutz.abstract_method {
  class Child extends ಠ_ಠ.clutz.abstract_method.Clazz {
    private noStructuralTyping_abstract_method_Child : any;
    bar (a : number ) : string ;
  }
}
declare module 'goog:abstract_method.Child' {
  import Child = ಠ_ಠ.clutz.abstract_method.Child;
  export default Child;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/abstract_method.js
declare namespace ಠ_ಠ.clutz.abstract_method {
  class Clazz implements ಠ_ಠ.clutz.abstract_method.Interface {
    private noStructuralTyping_abstract_method_Clazz : any;
    bar ( ...a : any [] ) : any ;
    foo ( ) : string ;
  }
}
declare module 'goog:abstract_method.Clazz' {
  import Clazz = ಠ_ಠ.clutz.abstract_method.Clazz;
  export default Clazz;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/abstract_method.js
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
