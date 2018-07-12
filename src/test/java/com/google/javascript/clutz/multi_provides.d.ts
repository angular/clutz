declare namespace ಠ_ಠ.clutz.multi_provides.a {
  var val : number ;
}
declare module 'goog:multi_provides.a' {
  import a = ಠ_ಠ.clutz.multi_provides.a;
  export = a;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  var three : string ;
}
declare module 'goog:multi_provides.a.b.c' {
  import c = ಠ_ಠ.clutz.multi_provides.a.b.c;
  export = c;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  class Two extends Two_Instance {
  }
  class Two_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:multi_provides.a.b.c.Two' {
  import Two = ಠ_ಠ.clutz.multi_provides.a.b.c.Two;
  export default Two;
}
