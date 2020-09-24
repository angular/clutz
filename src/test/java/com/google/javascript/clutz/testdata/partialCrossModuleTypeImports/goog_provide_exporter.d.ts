// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_provide_exporter.js
declare namespace ಠ_ಠ.clutz.googprovide {
  class exporter {
    private noStructuralTyping_googprovide_exporter : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_provide_exporter.js
declare module 'goog:googprovide.exporter' {
  import exporter = ಠ_ಠ.clutz.googprovide.exporter;
  export default exporter;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_provide_exporter';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partialCrossModuleTypeImports/goog_provide_exporter' {
  import exporter = ಠ_ಠ.clutz.googprovide.exporter;
  export { exporter };
  const __clutz_strip_property: 'exporter';
  const __clutz_actual_namespace: 'googprovide.exporter';
}
