declare namespace ಠ_ಠ.clutz_internal.generics {
  interface ExtendGenericInterface < TYPE > extends GenericInterface < TYPE > {
  }
  class ExtendsGenericClass < TYPE > extends Foo < TYPE , number > {
  }
  class Foo < T , U > {
    private noStructuralTyping_: any;
    constructor (a : number ) ;
    get ( ) : T ;
    loop < V , W > (t : T , v : V ) : any ;
    set (t : T ) : void ;
  }
  interface GenericInterface < TYPE > {
  }
  class ImplementsGenericInterface < TYPE > implements GenericInterface < TYPE > {
    private noStructuralTyping_: any;
  }
  var arrayMissingTypeParam : any [] ;
  var fooMissingAllTypeParams : Foo < any , any > ;
  var fooMissingOneTypeParam : Foo < string , any > ;
  function genericFunction < T > (a : T ) : T ;
  function identity < T > (a : T ) : T ;
  function objectWithGenericKeyType < K , V > (obj : { [ /* warning: coerced from K */ s: string ]: V } ) : void ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'generics'): typeof ಠ_ಠ.clutz_internal.generics;
}
declare module 'goog:generics' {
  import alias = ಠ_ಠ.clutz_internal.generics;
  export = alias;
}
