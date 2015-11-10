declare namespace ಠ_ಠ.clutz_internal.nullable {
  var w : boolean ;
  /**
   * Explicitly non-nullable.
   */
  var x : Object ;
  /**
   * Implicitly nullable.
   */
  var y : Object ;
  /**
   * Explicitly nullable.
   */
  var z : Object ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'nullable'): typeof ಠ_ಠ.clutz_internal.nullable;
}
declare module 'goog:nullable' {
  import alias = ಠ_ಠ.clutz_internal.nullable;
  export = alias;
}
