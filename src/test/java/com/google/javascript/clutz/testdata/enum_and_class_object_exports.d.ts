// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_and_class_object_exports.js
declare namespace ಠ_ಠ.clutz.foo.bar {
  class Class {
    private noStructuralTyping_module$contents$foo$bar_ExportObject_Class : any;
  }
  let Enum : ಠ_ಠ.clutz.module$contents$foo$bar_ExportObject.Enum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_and_class_object_exports.js
declare module 'goog:foo.bar' {
  import bar = ಠ_ಠ.clutz.foo.bar;
  export = bar;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_and_class_object_exports';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/enum_and_class_object_exports' {
  import bar = ಠ_ಠ.clutz.foo.bar;
  export = bar;
  const __clutz_actual_namespace: 'foo.bar';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/enum_and_class_object_exports.js
declare namespace ಠ_ಠ.clutz.module$contents$foo$bar_ExportObject {
  enum Enum {
    A = 'A' ,
  }
}
