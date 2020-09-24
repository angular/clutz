// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/requireType.js
declare namespace ಠ_ಠ.clutz.module$exports$some$module {
  function f (a : ಠ_ಠ.clutz.module$exports$some$other$module$aType ) : void ;
  function g (b : ಠ_ಠ.clutz.module$exports$some$other$module$bType.BType ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/requireType.js
declare module 'goog:some.module' {
  import module = ಠ_ಠ.clutz.module$exports$some$module;
  export = module;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/requireType';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/requireType' {
  import module = ಠ_ಠ.clutz.module$exports$some$module;
  export = module;
  const __clutz_actual_namespace: 'some.module';
}
