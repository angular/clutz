// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/extern_reexport.js
declare namespace ಠ_ಠ.clutz.module$exports$extern$reexport {
  type x = ಠ_ಠ.clutz.someExtern.x ;
  let x : typeof ಠ_ಠ.clutz.someExtern.x ;
  let y : any ;
}
declare module 'goog:extern.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$extern$reexport;
  export = reexport;
}
