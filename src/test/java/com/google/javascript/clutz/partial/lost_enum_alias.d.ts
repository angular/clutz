declare namespace ಠ_ಠ.clutz.module$exports$lost$enum$alias {
  class C {
    private noStructuralTyping_module$exports$lost$enum$alias_C : any;
    t : ಠ_ಠ.clutz.module$exports$lost$enum$alias.TypeDef ;
  }
  /**
   * Partial alias of some of the enum fields.
   */
  type EAlias = ಠ_ಠ.clutz.module$exports$some$other$Enum.E &{clutzEnumBrand: never} ;
  let EAlias : {
    A : EAlias ,
  };
  //!! This is wrong, it should contain a mention to EAlias.
  type TypeDef = { e : undefined } ;
}
declare module 'goog:lost.enum.alias' {
  import alias = ಠ_ಠ.clutz.module$exports$lost$enum$alias;
  export = alias;
}
