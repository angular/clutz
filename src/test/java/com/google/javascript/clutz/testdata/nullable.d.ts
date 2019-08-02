declare namespace ಠ_ಠ.clutz.nullable {
  let w : boolean | null ;
  /**
   * Explicitly non-nullable.
   */
  let x : GlobalObject ;
  /**
   * Implicitly nullable.
   */
  let y : GlobalObject | null ;
  /**
   * Explicitly nullable.
   */
  let z : GlobalObject | null ;
}
declare module 'goog:nullable' {
  import nullable = ಠ_ಠ.clutz.nullable;
  export = nullable;
}
