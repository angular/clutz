// Generated from src/test/java/com/google/javascript/clutz/testdata/recursive_typedef.js
declare namespace ಠ_ಠ.clutz.rec {
  class Aclass {
    private noStructuralTyping_rec_Aclass : any;
    foo : ಠ_ಠ.clutz.rec.ns.Arr ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/recursive_typedef.js
declare module 'goog:rec.Aclass' {
  import Aclass = ಠ_ಠ.clutz.rec.Aclass;
  export default Aclass;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/recursive_typedef';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/recursive_typedef' {
  import Aclass = ಠ_ಠ.clutz.rec.Aclass;
  export { Aclass };
  const __clutz_strip_property: 'Aclass';
  const __clutz_actual_namespace: 'rec.Aclass';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/recursive_typedef.js
declare namespace ಠ_ಠ.clutz.rec.ns {
  type Arr = ಠ_ಠ.clutz.rec.ns.El [] ;
  type El = { arr : ಠ_ಠ.clutz.rec.ns.Arr } ;
  type T = { t : any } ;
  let foo : ಠ_ಠ.clutz.rec.ns.Arr ;
  let foo2 : ಠ_ಠ.clutz.rec.ns.El ;
  let tconst : ಠ_ಠ.clutz.rec.ns.T ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/recursive_typedef.js
declare module 'goog:rec.ns' {
  import ns = ಠ_ಠ.clutz.rec.ns;
  export = ns;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/recursive_typedef' {
  export {};
  const __clutz_multiple_provides: true;
}
