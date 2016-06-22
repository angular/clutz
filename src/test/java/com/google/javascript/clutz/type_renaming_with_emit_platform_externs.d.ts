declare namespace ಠ_ಠ.clutz {
  class Arguments < T > extends Arguments_Instance < T > {
  }
  class Arguments_Instance < T > implements IArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Array < T > extends Array_Instance < T > {
  }
  class Array_Instance < T > implements IArrayLike < T > {
    private noStructuralTyping_: any;
    constructor ( ...var_args : any [] ) ;
    [ key: number ]: T ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IArrayLike < VALUE2 > extends IObject < number , VALUE2 > {
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IObject < KEY1 , VALUE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IThenable < TYPE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessageEvent < T > extends MessageEvent_Instance < T > {
  }
  class MessageEvent_Instance < T > {
    private noStructuralTyping_: any;
    data : T ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NodeList < T > extends NodeList_Instance < T > {
  }
  class NodeList_Instance < T > implements IArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    item (index : number ) : T | null ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Object extends Object_Instance {
  }
  class Object_Instance {
    private noStructuralTyping_: any;
    constructor (opt_value ? : any ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  function Symbol (description : string ) : any ;
}
