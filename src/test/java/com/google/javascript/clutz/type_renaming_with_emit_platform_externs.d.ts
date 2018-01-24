declare namespace ಠ_ಠ.clutz {
  class module$exports$Arguments < T > extends module$exports$Arguments_Instance < T > {
  }
  class module$exports$Arguments_Instance < T > implements ಠ_ಠ.clutz.module$exports$IArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Array < T > extends module$exports$Array_Instance < T > {
  }
  class module$exports$Array_Instance < T > implements ಠ_ಠ.clutz.module$exports$IArrayLike < T > {
    private noStructuralTyping_: any;
    constructor ( ...var_args : any [] ) ;
    [ key: number ]: T ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$IArrayLike < VALUE2 > extends IObject < number , VALUE2 > {
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IObject < KEY1 , VALUE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$IThenable < TYPE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$MessageEvent < T > extends module$exports$MessageEvent_Instance < T > {
  }
  class module$exports$MessageEvent_Instance < T > {
    private noStructuralTyping_: any;
    data : T ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$NodeList < T > extends module$exports$NodeList_Instance < T > {
  }
  class module$exports$NodeList_Instance < T > implements ಠ_ಠ.clutz.module$exports$IArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    item (index : number ) : T | null ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Object extends module$exports$Object_Instance {
  }
  class module$exports$Object_Instance {
    private noStructuralTyping_: any;
    constructor (opt_value ? : any ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  function module$exports$Symbol (description : string ) : any ;
}
