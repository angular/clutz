// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/colliding_provide.js
declare namespace ಠ_ಠ.clutz.colliding_provide {
  let aliased__clutz_alias : any;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/colliding_provide.js
declare module 'goog:colliding_provide.aliased' {
  import aliased = ಠ_ಠ.clutz.colliding_provide.aliased__clutz_alias;
  export default aliased;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/colliding_provide.js
declare namespace ಠ_ಠ.clutz.colliding_provide {
  let not_aliased : any;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/colliding_provide.js
declare module 'goog:colliding_provide.not_aliased' {
  import not_aliased = ಠ_ಠ.clutz.colliding_provide.not_aliased;
  export default not_aliased;
}
