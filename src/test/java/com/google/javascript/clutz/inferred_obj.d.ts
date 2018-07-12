declare namespace ಠ_ಠ.clutz.inferred.nested.obj {
  var nestedObj : { '0123' : number , 'must-be-quoted' : number , quoted : number , regular : number } ;
  var quotedProp : number ;
  var regular : number ;
}
declare module 'goog:inferred.nested.obj' {
  import obj = ಠ_ಠ.clutz.inferred.nested.obj;
  export = obj;
}
