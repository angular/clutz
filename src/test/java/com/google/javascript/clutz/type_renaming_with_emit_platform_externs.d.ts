declare namespace ಠ_ಠ.clutz {
  class Arguments < T > extends Arguments_Instance < T > {
  }
  class Arguments_Instance < T > implements IArrayLike < T > {
    private noStructuralTyping_: any;
    [key: string]: any;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IArrayLike < VALUE2 > {
    length : number ;
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
    [key: string]: any;
    item (index : number ) : T ;
    length : number ;
  }
}
