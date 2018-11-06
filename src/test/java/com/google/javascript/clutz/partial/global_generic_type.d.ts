declare namespace ಠ_ಠ.clutz.global.generic {
  let type : Map < string , string > ;
}
declare module 'goog:global.generic.type' {
  import type = ಠ_ಠ.clutz.global.generic.type;
  export default type;
}
declare namespace ಠ_ಠ.clutz.global.non.generic {
  let type : Map ;
}
declare module 'goog:global.non.generic.type' {
  import type = ಠ_ಠ.clutz.global.non.generic.type;
  export default type;
}
declare namespace ಠ_ಠ.clutz.nested.generic {
  let type : ಠ_ಠ.clutz.SomeType < Map < string , string > > ;
}
declare module 'goog:nested.generic.type' {
  import type = ಠ_ಠ.clutz.nested.generic.type;
  export default type;
}
