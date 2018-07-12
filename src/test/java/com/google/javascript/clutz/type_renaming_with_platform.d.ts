declare namespace ಠ_ಠ.clutz.type_renaming_with_externs {
  var args : IArguments ;
  var arrayLike : ArrayLike < number > ;
  var thenable : PromiseLike < string > ;
}
declare module 'goog:type_renaming_with_externs' {
  import type_renaming_with_externs = ಠ_ಠ.clutz.type_renaming_with_externs;
  export = type_renaming_with_externs;
}
