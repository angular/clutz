declare namespace ಠ_ಠ.clutz.type_renaming_with_externs {
  var args : IArguments ;
  var arrayLike : ArrayLike < number > ;
  var thenable : PromiseLike < string > ;
}
declare namespace goog {
  function require(name: 'type_renaming_with_externs'): typeof ಠ_ಠ.clutz.type_renaming_with_externs;
}
declare module 'goog:type_renaming_with_externs' {
  import alias = ಠ_ಠ.clutz.type_renaming_with_externs;
  export = alias;
}
