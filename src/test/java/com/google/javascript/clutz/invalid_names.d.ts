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
declare namespace ಠ_ಠ.clutz.ext {
  var valid : any ;
}
declare namespace ಠ_ಠ.clutz.ext.invalidNames {
  var valid : any ;
}
