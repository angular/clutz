// Generated from src/test/java/com/google/javascript/clutz/testdata/methods_generics.js
declare namespace ಠ_ಠ.clutz.method_generics {
  class Foo < T = any > {
    private noStructuralTyping_method_generics_Foo : [ T ];
    constructor (a : T ) ;
    /**
     * T is defined on the constructor and should not be redefined on the method level in the resulting
     * typescript code. R should be defined on the method level.
     */
    bar < R = any > (foo : T , bar : R ) : void ;
    /**
     * T is defined on the constructor and should not be redefined on the method level in the resulting
     * typescript code.
     */
    pop ( ) : T ;
    /**
     * T is defined on the constructor and should not be redefined on the method level in the resulting
     * typescript code.
     */
    push (value : T ) : void ;
    /**
     * Static method: T and R must be defined on the method in the resulting typescript code
     */
    static staticBar < T = any , R = any > (bar : R ) : T ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/methods_generics.js
declare module 'goog:method_generics' {
  import method_generics = ಠ_ಠ.clutz.method_generics;
  export = method_generics;
}
