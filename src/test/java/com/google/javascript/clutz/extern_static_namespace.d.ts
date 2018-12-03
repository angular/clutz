declare namespace ಠ_ಠ.clutz {
  class ExternStaticC {
    //!! static ns: Object; is intentionally not emitted here
    //!! not to collide with namespace ಠ_ಠ.clutz.ExternStaticC.ns.
    //!! same for objNsLike, fn.
    //!! TODO(rado): Find a work-around so that the function fn is also available.
    private noStructuralTyping_ExternStaticC : any;
    static literal : { foo : string } ;
  }
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.fn {
  let a : string ;
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.ns {
  let a : number ;
}
declare namespace ಠ_ಠ.clutz.ExternStaticC.objNsLike {
  let a : string ;
}
