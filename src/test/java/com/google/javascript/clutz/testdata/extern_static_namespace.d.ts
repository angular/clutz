// Generated from src/test/java/com/google/javascript/clutz/testdata/extern_static_namespace.externs.js
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
// Generated from src/test/java/com/google/javascript/clutz/testdata/extern_static_namespace.externs.js
declare namespace ಠ_ಠ.clutz.ExternStaticC.fn {
  let a : string ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extern_static_namespace.externs.js
declare namespace ಠ_ಠ.clutz.ExternStaticC.ns {
  let a : number ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/extern_static_namespace.externs.js
declare namespace ಠ_ಠ.clutz.ExternStaticC.objNsLike {
  let a : string ;
}
