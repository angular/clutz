declare namespace ಠ_ಠ.clutz.module$exports$override {
  class ExtendsBase extends ExtendsBase_Instance {
  }
  class ExtendsBase_Instance extends module$contents$override_Base_Instance {
    /**
     * This function has no type information, but its base class is visible, so it should inherit
     * the types from the base.
     */
    method (x : number ) : void ;
  }
  class ExtendsInvisible extends ExtendsInvisible_Instance {
  }
  class ExtendsInvisible_Instance extends ಠ_ಠ.clutz.module$exports$override.Invisible_Instance {
    constructor ( ) ;
    /**
     * This function has no known type, so its parameter should be optional.
     */
    inferredOverride (x ? : any ) : void ;
    /**
     * Ordinary function, for comparison with the others.
     */
    nonOverride (x : number ) : void ;
    /**
     * This function uses @override, but it includes type information, so that type should persist.
     */
    overrideWithType (x : number ) : number ;
  }
  interface Template < T = any > {
    /**
     * The type of T in the callback should not be marked optional.
     */
    callbackWithTemplateArg < R = any > (f : (a : T ) => R ) : void ;
    /**
     * Note: we currently get this wrong, in that we mark the callback param as optional.
     * We can fix later if it matters.
     */
    callbackWithUnknownArg < R = any > (f : (a ? : any ) => R ) : void ;
  }
}
declare module 'goog:override' {
  import override = ಠ_ಠ.clutz.module$exports$override;
  export = override;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$override_Base extends module$contents$override_Base_Instance {
  }
  class module$contents$override_Base_Instance {
    private noStructuralTyping_: any;
    method (x : number ) : void ;
  }
}
