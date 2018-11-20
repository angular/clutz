declare namespace ಠ_ಠ.clutz {
  class module$exports$abst$method {
    private noStructuralTyping_: any;
    /**
     * It appears that this one is emitted correctly without partial_goog_base.js
     */
    methodWithTypes ( ) : number ;
    /**
     * But this one needs partial_goog_base.js
     */
    methodWithoutTypes ( ...a : any [] ) : any ;
  }
}
declare module 'goog:abst.method' {
  import method = ಠ_ಠ.clutz.module$exports$abst$method;
  export default method;
}
