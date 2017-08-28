declare namespace ಠ_ಠ.clutz.multi_provides.a {
  var val : number ;
}
declare module 'goog:multi_provides.a' {
  import alias = ಠ_ಠ.clutz.multi_provides.a;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  var three : string ;
}
declare module 'goog:multi_provides.a.b.c' {
  import alias = ಠ_ಠ.clutz.multi_provides.a.b.c;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  class Two extends Two_Instance {
  }
  class Two_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:multi_provides.a.b.c.Two' {
  import alias = ಠ_ಠ.clutz.multi_provides.a.b.c.Two;
  export default alias;
}
