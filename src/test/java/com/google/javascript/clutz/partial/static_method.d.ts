declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$bar$Class extends module$exports$foo$bar$Class_Instance {
    static equals (c1 : module$exports$foo$bar$Class | null , c2 : module$exports$foo$bar$Class | null ) : boolean ;
  }
  class module$exports$foo$bar$Class_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo.bar {
  export import Class = ಠ_ಠ.clutz.module$exports$foo$bar$Class;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar {
  export import Class = ಠ_ಠ.clutz.module$exports$foo$bar$Class;
}
declare module 'goog:foo.bar.Class' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$bar$Class;
  export default alias;
}
