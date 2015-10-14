// Work around for https://github.com/Microsoft/TypeScript/issues/983
// All Cl2dts namespaces are below ಠ_ಠ.cl2dts_internal, thus
// this acts as global.
declare namespace ಠ_ಠ.clutz_internal {
  type GlobalError = Error;
  var GlobalError: ErrorConstructor;
}
