declare namespace ಠ_ಠ.clutz.is.def.and {
  let not : { null : (c : ಠ_ಠ.clutz.some.C | null ) => any };
}
declare module 'goog:is.def.and.not.null' {
  import null_ = ಠ_ಠ.clutz.is.def.and.not;
  export default null_.null;
}
//!! This is a bug, this shouldn't be here.
declare namespace ಠ_ಠ.clutz.some {
  let C : any ;
}
