declare namespace ಠ_ಠ.clutz.provides {
  class C {
    private noStructuralTyping_provides_C : any;
  }
}
declare module 'goog:provides.C' {
  import C = ಠ_ಠ.clutz.provides.C;
  export default C;
}
declare namespace ಠ_ಠ.clutz.provides {
  let instance : ಠ_ಠ.clutz.provides.C ;
}
declare module 'goog:provides.instance' {
  import instance = ಠ_ಠ.clutz.provides.instance;
  export default instance;
}
