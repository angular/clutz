declare namespace ಠ_ಠ.clutz.nullable {
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
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nullable'): typeof ಠ_ಠ.clutz.nullable;
}
declare module 'goog:nullable' {
  import alias = ಠ_ಠ.clutz.nullable;
  export = alias;
}
