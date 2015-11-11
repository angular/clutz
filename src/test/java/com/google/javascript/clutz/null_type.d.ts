declare namespace ಠ_ಠ.clutz {
  function nulltypes (a : any , b ? : any ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nulltypes'): typeof ಠ_ಠ.clutz.nulltypes;
}
declare module 'goog:nulltypes' {
  import alias = ಠ_ಠ.clutz.nulltypes;
  export default alias;
}
