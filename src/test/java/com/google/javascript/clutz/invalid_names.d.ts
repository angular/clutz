declare namespace ಠ_ಠ.clutz.invalid.names {
  var valid : any ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'invalid.names'): typeof ಠ_ಠ.clutz.invalid.names;
}
declare module 'goog:invalid.names' {
  import alias = ಠ_ಠ.clutz.invalid.names;
  export = alias;
}
