declare namespace ಠ_ಠ.clutz.a.b {
  class StaticHolder extends StaticHolder_Instance {
  }
  class StaticHolder_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:a.b.StaticHolder' {
  import alias = ಠ_ಠ.clutz.a.b.StaticHolder;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  enum AnEnum {
    X ,
    Y ,
  }
}
declare module 'goog:a.b.StaticHolder.AnEnum' {
  import alias = ಠ_ಠ.clutz.a.b.StaticHolder.AnEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  function aFunction ( ) : boolean ;
}
declare module 'goog:a.b.StaticHolder.aFunction' {
  import alias = ಠ_ಠ.clutz.a.b.StaticHolder.aFunction;
  export default alias;
}
