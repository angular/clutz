declare namespace ಠ_ಠ.clutz {
  class ExternStaticC extends ExternStaticC_Instance {
    //!! static ns: Object; is intentionally not emitted here
    //!! not to collide with namespace ಠ_ಠ.clutz.ExternStaticC.ns.
    //!! same for objNsLike, fn.
    //!! TODO(rado): Find a work-around so that the function fn is also available.
    static literal : { foo : string } ;
  }
  class ExternStaticC_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.fn {
  var a : string ;
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.ns {
  var a : number ;
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.objNsLike {
  var a : string ;
}
