declare namespace ಠ_ಠ.clutz.default_var {
  var Var : number ;
}
declare namespace goog {
  function require(name: 'default_var.Var'): typeof ಠ_ಠ.clutz.default_var.Var;
}
declare module 'goog:default_var.Var' {
  import alias = ಠ_ಠ.clutz.default_var.Var;
  export default alias;
}
