// Generated from src/test/java/com/google/javascript/clutz/testdata/generics.js
declare namespace ಠ_ಠ.clutz.generics {
  interface ExtendGenericInterface < TYPE = any > extends ಠ_ಠ.clutz.generics.GenericInterface < TYPE > {
  }
  class ExtendsGenericClass < TYPE = any > extends ಠ_ಠ.clutz.generics.Foo < TYPE , number > {
    private noStructuralTyping_generics_ExtendsGenericClass : any;
    constructor ( ) ;
  }
  class Foo < T = any , U = any > {
    private noStructuralTyping_generics_Foo : any;
    constructor (a : number ) ;
    get ( ) : T ;
    loop < V = any , W = any > (t : T , v : V ) : any ;
    set (t : T ) : void ;
  }
  interface GenericInterface < TYPE = any > {
  }
  class ImplementsGenericInterface < TYPE = any > implements ಠ_ಠ.clutz.generics.GenericInterface < TYPE > {
    private noStructuralTyping_generics_ImplementsGenericInterface : any;
  }
  let arrayMissingTypeParam : any [] ;
  let fooMissingAllTypeParams : ಠ_ಠ.clutz.generics.Foo < any , any > ;
  let fooMissingOneTypeParam : ಠ_ಠ.clutz.generics.Foo < string , any > ;
  function genericFunction < T = any > (a : T ) : T ;
  function identity < T = any > (a : T ) : T ;
  function objectWithGenericKeyType < K = any , V = any > (obj : { [ /* warning: coerced from K */ key: string ]: V } ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/generics.js
declare module 'goog:generics' {
  import generics = ಠ_ಠ.clutz.generics;
  export = generics;
}
