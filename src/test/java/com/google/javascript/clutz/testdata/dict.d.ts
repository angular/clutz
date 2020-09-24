// Generated from src/test/java/com/google/javascript/clutz/testdata/dict.js
declare namespace ಠ_ಠ.clutz.dict {
  class ClassWithDottedProperties {
    private noStructuralTyping_dict_ClassWithDottedProperties : any;
    [ key: string ]: any ;
    foo : number ;
  }
  class DictClass {
    private noStructuralTyping_dict_DictClass : any;
    constructor (n ? : any ) ;
    [ key: string ]: any ;
    foo ( ) : void ;
  }
  let typed : { a : Function | null } ;
  let untyped : {[key: string]: any} ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/dict.js
declare module 'goog:dict' {
  import dict = ಠ_ಠ.clutz.dict;
  export = dict;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/dict';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/dict' {
  import dict = ಠ_ಠ.clutz.dict;
  export = dict;
  const __clutz_actual_namespace: 'dict';
}
