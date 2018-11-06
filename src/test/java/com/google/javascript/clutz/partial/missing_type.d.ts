declare namespace ಠ_ಠ.clutz.module$exports$missing$type {
  let x : ಠ_ಠ.clutz.Missing ;
  let xWithGenerics : ಠ_ಠ.clutz.goog.missing.map < string , number > ;
  let xWithMissingGenerics : ಠ_ಠ.clutz.goog.missing.map < ಠ_ಠ.clutz.mod.ref.A , ಠ_ಠ.clutz.mod.ref.B < ಠ_ಠ.clutz.mod.ref.C > > ;
}
declare module 'goog:missing.type' {
  import type = ಠ_ಠ.clutz.module$exports$missing$type;
  export = type;
}
