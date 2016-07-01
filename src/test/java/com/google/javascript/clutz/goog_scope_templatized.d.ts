declare namespace ಠ_ಠ.clutz.aliasT {
  type I < T > = ಠ_ಠ.clutz.$jscomp.scope.I < T > ;
}
declare module 'goog:aliasT.I' {
  import alias = ಠ_ಠ.clutz.aliasT.I;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.aliasT {
  type I2 < T > = ಠ_ಠ.clutz.$jscomp.scope.I < T > ;
}
declare module 'goog:aliasT.I2' {
  import alias = ಠ_ಠ.clutz.aliasT.I2;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.aliasT {
  //!! TODO(rado): investigate why this is not I<string>.
  var iboom : ಠ_ಠ.clutz.$jscomp.scope.I < any > | null ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'aliasT.iboom'): typeof ಠ_ಠ.clutz.aliasT.iboom;
}
declare module 'goog:aliasT.iboom' {
  import alias = ಠ_ಠ.clutz.aliasT.iboom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  interface I < T > {
  }
}
