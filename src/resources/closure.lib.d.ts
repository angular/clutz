// Work around for https://github.com/Microsoft/TypeScript/issues/983
// All clutz namespaces are below ಠ_ಠ.clutz, thus
// this acts as global.
declare namespace ಠ_ಠ.clutz {
  type GlobalError = Error;
  var GlobalError: ErrorConstructor;
  /** Represents the type returned when goog.require-ing an unknown symbol */
  type ClosureSymbolNotGoogProvided = void;
  /** Represents a Closure type that is private, represented by an empty interface. */
  type PrivateType = void;
}

// Will be extended if base.js is a dependency.
declare namespace ಠ_ಠ.clutz.goog {
  var __namespace_needs_to_be_non_value_empty__: void;
}

// Closure's goog namespace is accessible as a global symbol without the need for
// an explicit goog.require, during the closure compiler pass.
declare var goog: typeof ಠ_ಠ.clutz.goog;
