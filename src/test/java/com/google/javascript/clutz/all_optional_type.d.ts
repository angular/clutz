declare namespace ಠ_ಠ.clutz.module$exports$collapsed$union {
  function fn (arg : { opt_some ? : string } | Function | null ) : void ;
  //!! TODO(rado): It would be better if {other: string} was not omitted.
  function fn2 (arg : { opt_some ? : string } ) : void ;
}
declare module 'goog:collapsed.union' {
  import union = ಠ_ಠ.clutz.module$exports$collapsed$union;
  export = union;
}
