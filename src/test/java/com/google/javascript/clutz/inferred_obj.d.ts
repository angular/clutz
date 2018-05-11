declare namespace ಠ_ಠ.clutz.inferred.nested.obj {
  // skipping property '0123' because it is not a valid symbol.
  // skipping property 'must-be-quoted' because it is not a valid symbol.
  var nestedObj : { '0123' : number , 'must-be-quoted' : number , quoted : number , regular : number } ;
  var quotedProp : number ;
  var regular : number ;
}
declare module 'goog:inferred.nested.obj' {
  import alias = ಠ_ಠ.clutz.inferred.nested.obj;
  export = alias;
}
