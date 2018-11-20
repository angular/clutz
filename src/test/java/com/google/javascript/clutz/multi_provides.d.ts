declare namespace ಠ_ಠ.clutz.multi_provides.a {
  let val : number ;
}
declare module 'goog:multi_provides.a' {
  import a = ಠ_ಠ.clutz.multi_provides.a;
  export = a;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  let three : string ;
}
declare module 'goog:multi_provides.a.b.c' {
  import c = ಠ_ಠ.clutz.multi_provides.a.b.c;
  export = c;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  class Two {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:multi_provides.a.b.c.Two' {
  import Two = ಠ_ಠ.clutz.multi_provides.a.b.c.Two;
  export default Two;
}
