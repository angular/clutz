declare namespace ಠ_ಠ.clutz.module$exports$method_generics {
  class Foo < T > extends Foo_Instance < T > {
    /**
     * Static method: T and R must be defined on the method in the resulting typescript code
     */
    static staticBar < T , R > (bar : R ) : T ;
  }
  class Foo_Instance < T > {
    private noStructuralTyping_: any;
    constructor (a : T ) ;
    /**
     * T is defined on the constructor and should not be redefined on the method level in the resulting
     * typescript code. R should be defined on the method level.
     */
    bar < R > (foo : T , bar : R ) : void ;
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
  }
}
declare module 'goog:method_generics' {
  import alias = ಠ_ಠ.clutz.module$exports$method_generics;
  export = alias;
}
