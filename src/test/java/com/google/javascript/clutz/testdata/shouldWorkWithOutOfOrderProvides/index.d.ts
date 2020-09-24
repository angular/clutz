// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/dep.js
declare namespace ಠ_ಠ.clutz.dep {
  class D {
    private noStructuralTyping_dep_D : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/dep.js
declare module 'goog:dep.D' {
  import D = ಠ_ಠ.clutz.dep.D;
  export default D;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/dep';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/dep' {
  import D = ಠ_ಠ.clutz.dep.D;
  export { D };
  const __clutz_strip_property: 'D';
  const __clutz_actual_namespace: 'dep.D';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/index.js
declare namespace ಠ_ಠ.clutz.main {
  class A {
    private noStructuralTyping_main_A : any;
    fn (a : ಠ_ಠ.clutz.dep.D ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/index.js
declare module 'goog:main.A' {
  import A = ಠ_ಠ.clutz.main.A;
  export default A;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/index';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldWorkWithOutOfOrderProvides/index' {
  import A = ಠ_ಠ.clutz.main.A;
  export { A };
  const __clutz_strip_property: 'A';
  const __clutz_actual_namespace: 'main.A';
}
