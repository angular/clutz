// Generated from src/test/java/com/google/javascript/clutz/testdata/abstract_class.js
declare namespace ಠ_ಠ.clutz {
  abstract class module$exports$foo$AbstractClass {
    private noStructuralTyping_module$exports$foo$AbstractClass : any;
    protected abstract myAbstractMethod ( ) : string ;
    abstract myStaticAbstractMethod ( ) : string ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/abstract_class.js
declare module 'goog:foo.AbstractClass' {
  import AbstractClass = ಠ_ಠ.clutz.module$exports$foo$AbstractClass;
  export default AbstractClass;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/abstract_class';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/abstract_class' {
  import AbstractClass = ಠ_ಠ.clutz.module$exports$foo$AbstractClass;
  export { AbstractClass };
  const __clutz_strip_property: 'AbstractClass';
  const __clutz_actual_namespace: 'foo.AbstractClass';
}
