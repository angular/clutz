declare namespace ಠ_ಠ.clutz {
  function nulltypes (a : null , b ? : null ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nulltypes'): typeof ಠ_ಠ.clutz.nulltypes;
}
declare module 'goog:nulltypes' {
  import alias = ಠ_ಠ.clutz.nulltypes;
  export default alias;
}
