// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/index.js
declare namespace ಠ_ಠ.clutz.namedType {
  class A < U = any > {
    private noStructuralTyping_namedType_A : [ U ];
    fn (a : ಠ_ಠ.clutz.namedType.D < U > ) : any ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/index.js
declare module 'goog:namedType.A' {
  import A = ಠ_ಠ.clutz.namedType.A;
  export default A;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/index';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/index' {
  import A = ಠ_ಠ.clutz.namedType.A;
  export { A };
  const __clutz_strip_property: 'A';
  const __clutz_actual_namespace: 'namedType.A';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/dep.js
declare namespace ಠ_ಠ.clutz.namedType {
  class D < T = any > {
    private noStructuralTyping_namedType_D : [ T ];
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/dep.js
declare module 'goog:namedType.D' {
  import D = ಠ_ಠ.clutz.namedType.D;
  export default D;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/dep';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shouldResolveNamedTypes/dep' {
  import D = ಠ_ಠ.clutz.namedType.D;
  export { D };
  const __clutz_strip_property: 'D';
  const __clutz_actual_namespace: 'namedType.D';
}
