// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/lost_enum_alias.js
declare namespace ಠ_ಠ.clutz.module$exports$lost$enum$alias {
  class C {
    private noStructuralTyping_module$exports$lost$enum$alias_C : any;
    t : ಠ_ಠ.clutz.module$exports$lost$enum$alias.TypeDef ;
  }
  /**
   * Partial alias of some of the enum fields.
   */
  type EAlias = ( ಠ_ಠ.clutz.module$exports$some$other$Enum.E ) &{clutzEnumBrand: never} ;
  let EAlias : {
    A : EAlias ,
  };
  //!! This is wrong, it should contain a mention to EAlias.
  type TypeDef = { e : undefined } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/lost_enum_alias.js
declare module 'goog:lost.enum.alias' {
  import alias = ಠ_ಠ.clutz.module$exports$lost$enum$alias;
  export = alias;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/lost_enum_alias';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/lost_enum_alias' {
  import alias = ಠ_ಠ.clutz.module$exports$lost$enum$alias;
  export = alias;
  const __clutz_actual_namespace: 'lost.enum.alias';
}
