declare namespace ಠ_ಠ.clutz {
  var module$exports$type_renaming_with_externs$args : IArguments ;
  var module$exports$type_renaming_with_externs$arrayLike : ArrayLike < number > ;
  var module$exports$type_renaming_with_externs$thenable : PromiseLike < string > ;
}
declare namespace ಠ_ಠ.clutz.module$exports$type_renaming_with_externs {
  export import args = ಠ_ಠ.clutz.module$exports$type_renaming_with_externs$args;
}
declare namespace ಠ_ಠ.clutz.module$exports$type_renaming_with_externs {
  export import arrayLike = ಠ_ಠ.clutz.module$exports$type_renaming_with_externs$arrayLike;
}
declare namespace ಠ_ಠ.clutz.module$exports$type_renaming_with_externs {
  export import thenable = ಠ_ಠ.clutz.module$exports$type_renaming_with_externs$thenable;
}
declare module 'goog:type_renaming_with_externs' {
  import alias = ಠ_ಠ.clutz.module$exports$type_renaming_with_externs;
  export = alias;
}
