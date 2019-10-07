// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.globalNs.generic {
  let type : Map < string , string > ;
}
declare module 'goog:globalNs.generic.type' {
  import type = ಠ_ಠ.clutz.globalNs.generic.type;
  export default type;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.globalNs.non.generic {
  let type : Map ;
}
declare module 'goog:globalNs.non.generic.type' {
  import type = ಠ_ಠ.clutz.globalNs.non.generic.type;
  export default type;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_generic_type.js
declare namespace ಠ_ಠ.clutz.nested.generic {
  let type : ಠ_ಠ.clutz.SomeType < Map < string , string > > ;
}
declare module 'goog:nested.generic.type' {
  import type = ಠ_ಠ.clutz.nested.generic.type;
  export default type;
}
