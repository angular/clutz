declare namespace ಠ_ಠ.clutz_internal.static_inherit {
  class Child extends Parent {
    static privateParentOverrideField : number ;
    static static_fn (a : number ) : void ;
    /** WARNING: emitted for non-matching super type's static method. Only the first overload is actually callable. */
    static static_fn (a : string ) : void ;
    static subTypeField : any [] ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'static_inherit.Child'): typeof ಠ_ಠ.clutz_internal.static_inherit.Child;
}
declare module 'goog:static_inherit.Child' {
  import alias = ಠ_ಠ.clutz_internal.static_inherit.Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.static_inherit {
  class GrandChild extends Child {
    static static_fn (a : boolean ) : void ;
    /** WARNING: emitted for non-matching super type's static method. Only the first overload is actually callable. */
    static static_fn (a : number ) : void ;
    /** WARNING: emitted for non-matching super type's static method. Only the first overload is actually callable. */
    static static_fn (a : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'static_inherit.GrandChild'): typeof ಠ_ಠ.clutz_internal.static_inherit.GrandChild;
}
declare module 'goog:static_inherit.GrandChild' {
  import alias = ಠ_ಠ.clutz_internal.static_inherit.GrandChild;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.static_inherit {
  class Parent {
    private noStructuralTyping_: any;
    static privateChildOverrideField : number ;
    static static_fn (a : string ) : void ;
    static subTypeField : Object ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'static_inherit.Parent'): typeof ಠ_ಠ.clutz_internal.static_inherit.Parent;
}
declare module 'goog:static_inherit.Parent' {
  import alias = ಠ_ಠ.clutz_internal.static_inherit.Parent;
  export default alias;
}
