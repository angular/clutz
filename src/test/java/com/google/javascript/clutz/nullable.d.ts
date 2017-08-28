declare namespace ಠ_ಠ.clutz.nullable {
  var w : boolean | null ;
  /**
   * Explicitly non-nullable.
   */
  var x : GlobalObject ;
  /**
   * Implicitly nullable.
   */
  var y : GlobalObject | null ;
  /**
   * Explicitly nullable.
   */
  var z : GlobalObject | null ;
}
declare module 'goog:nullable' {
  import alias = ಠ_ಠ.clutz.nullable;
  export = alias;
}
