declare namespace ಠ_ಠ.clutz {
  class module$exports$abstract_method$Child extends module$exports$abstract_method$Child_Instance {
  }
  class module$exports$abstract_method$Child_Instance extends ಠ_ಠ.clutz.module$exports$abstract_method$Clazz_Instance {
    bar (a : number ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$abstract_method {
  export import Child =  ಠ_ಠ.clutz.module$exports$abstract_method$Child;
}
declare module 'goog:abstract_method.Child' {
  import alias = ಠ_ಠ.clutz.module$exports$abstract_method$Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$abstract_method$Clazz extends module$exports$abstract_method$Clazz_Instance {
  }
  class module$exports$abstract_method$Clazz_Instance implements ಠ_ಠ.clutz.module$exports$abstract_method$Interface {
    private noStructuralTyping_: any;
    bar ( ...a : any [] ) : any ;
    foo ( ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$abstract_method {
  export import Clazz =  ಠ_ಠ.clutz.module$exports$abstract_method$Clazz;
}
declare module 'goog:abstract_method.Clazz' {
  import alias = ಠ_ಠ.clutz.module$exports$abstract_method$Clazz;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$abstract_method$Interface {
    bar (a : number ) : string ;
    foo ( ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$abstract_method {
  export import Interface =  ಠ_ಠ.clutz.module$exports$abstract_method$Interface;
}
declare module 'goog:abstract_method.Interface' {
  import alias = ಠ_ಠ.clutz.module$exports$abstract_method$Interface;
  export default alias;
}
