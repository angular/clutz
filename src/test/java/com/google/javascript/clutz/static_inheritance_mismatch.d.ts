declare namespace ಠ_ಠ.clutz {
  class module$exports$static_inherit$Child extends module$exports$static_inherit$Child_Instance {
    static privateParentOverrideField : number ;
    static static_fn (a : number ) : void ;
    static subTypeField : any [] ;
    static subTypeFieldMirrorType : ಠ_ಠ.clutz.module$exports$static_inherit$Child ;
  }
  class module$exports$static_inherit$Child_Instance extends ಠ_ಠ.clutz.module$exports$static_inherit$Parent_Instance {
  }
}
declare module 'goog:static_inherit.Child' {
  import alias = ಠ_ಠ.clutz.module$exports$static_inherit$Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$static_inherit$GrandChild extends module$exports$static_inherit$GrandChild_Instance {
    static static_fn (a : boolean ) : void ;
    static subTypeFieldMirrorType : ಠ_ಠ.clutz.module$exports$static_inherit$GrandChild ;
  }
  class module$exports$static_inherit$GrandChild_Instance extends ಠ_ಠ.clutz.module$exports$static_inherit$Child_Instance {
  }
}
declare module 'goog:static_inherit.GrandChild' {
  import alias = ಠ_ಠ.clutz.module$exports$static_inherit$GrandChild;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$static_inherit$Parent extends module$exports$static_inherit$Parent_Instance {
    static privateChildOverrideField : number ;
    static static_fn (a : string ) : void ;
    static subTypeField : GlobalObject ;
    static subTypeFieldMirrorType : ಠ_ಠ.clutz.module$exports$static_inherit$Parent ;
  }
  class module$exports$static_inherit$Parent_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:static_inherit.Parent' {
  import alias = ಠ_ಠ.clutz.module$exports$static_inherit$Parent;
  export default alias;
}
