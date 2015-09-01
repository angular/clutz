declare namespace ಠ_ಠ.cl2dts_internal.generics {
  class Foo < T , U > {
    get ( ) : T ;
    loop < V , W > (t : T , v : V ) : any ;
    set (t : T ) : void ;
  }
  var fooMissingOneTypeParam : Foo < string , any > ;
  var fooMissingAllTypeParams : Foo < any , any > ;
  var arrayMissingTypeParam : any [] ;
  function objectWithGenericKeyType < K , V > (obj : { [ /* warning: coerced from K */ s: string ]: V } ) : void ;
  function genericFunction < T > (a : T ) : T ;
  function identity < T > (a : T ) : T ;
  interface GenericInterface < TYPE > {
  }
  interface ExtendGenericInterface < TYPE > extends GenericInterface < TYPE > {
  }
}
declare module 'goog:generics' {
  import alias = ಠ_ಠ.cl2dts_internal.generics;
  export = alias;
}
