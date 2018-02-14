declare namespace ಠ_ಠ.clutz.global.generic {
  var type : Map < string , string > ;
}
declare module 'goog:global.generic.type' {
  import alias = ಠ_ಠ.clutz.global.generic.type;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.global.non.generic {
  var type : Map ;
}
declare module 'goog:global.non.generic.type' {
  import alias = ಠ_ಠ.clutz.global.non.generic.type;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested.generic {
  var type : ಠ_ಠ.clutz.SomeType < Map < string , string > > ;
}
declare module 'goog:nested.generic.type' {
  import alias = ಠ_ಠ.clutz.nested.generic.type;
  export default alias;
}
