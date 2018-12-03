declare namespace ಠ_ಠ.clutz.a.b {
  class StaticHolder {
    private noStructuralTyping_a_b_StaticHolder : any;
  }
}
declare module 'goog:a.b.StaticHolder' {
  import StaticHolder = ಠ_ಠ.clutz.a.b.StaticHolder;
  export default StaticHolder;
}
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  enum AnEnum {
    X = 0.0 ,
    Y = 1.0 ,
  }
}
declare module 'goog:a.b.StaticHolder.AnEnum' {
  import AnEnum = ಠ_ಠ.clutz.a.b.StaticHolder.AnEnum;
  export default AnEnum;
}
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  function aFunction ( ) : boolean ;
}
declare module 'goog:a.b.StaticHolder.aFunction' {
  import aFunction = ಠ_ಠ.clutz.a.b.StaticHolder.aFunction;
  export default aFunction;
}
