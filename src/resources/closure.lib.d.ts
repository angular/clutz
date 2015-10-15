// Work around for https://github.com/Microsoft/TypeScript/issues/983
// All clutz namespaces are below ಠ_ಠ.clutz_internal, thus
// this acts as global.
declare namespace ಠ_ಠ.clutz_internal {
  type GlobalError = Error;
  var GlobalError: ErrorConstructor;
}

// Closure's goog namespace is accessible as a global symbol without the need for
// an explicit goog.require, during the closure compiler pass.
declare var goog: typeof ಠ_ಠ.clutz_internal.goog;
