// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/extern_reexport.js
declare namespace ಠ_ಠ.clutz.module$exports$extern$reexport {
  export import x = ಠ_ಠ.clutz.someExtern.x ;
  let y : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/extern_reexport.js
declare module 'goog:extern.reexport' {
  import reexport = ಠ_ಠ.clutz.module$exports$extern$reexport;
  export = reexport;
}
