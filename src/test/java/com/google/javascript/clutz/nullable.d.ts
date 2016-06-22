declare namespace ಠ_ಠ.clutz.nullable {
  var w : boolean | null ;
  /**
   * Explicitly non-nullable.
   */
  var x : Object ;
  /**
   * Implicitly nullable.
   */
  var y : Object | null ;
  /**
   * Explicitly nullable.
   */
  var z : Object | null ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nullable'): typeof ಠ_ಠ.clutz.nullable;
}
declare module 'goog:nullable' {
  import alias = ಠ_ಠ.clutz.nullable;
  export = alias;
}
