// Work around for https://github.com/Microsoft/TypeScript/issues/983
// All clutz namespaces are below ಠ_ಠ.clutz, thus
// this acts as global.
declare namespace ಠ_ಠ.clutz {
  type GlobalError = Error;
  var GlobalError: ErrorConstructor;
  type GlobalEvent = Event;
  var GlobalEvent: typeof Event;
  /** Represents the type returned when goog.require-ing an unknown symbol */
  type ClosureSymbolNotGoogProvided = void;
  /** Represents a Closure type that is private, represented by an empty interface. */
  type PrivateType = void;
  /**
   * Represents a Closure class that is private. Only used for extending. When in
   * type position PrivateType is used.
   */
  class PrivateClass {}
  /**
   * Represents a Closure interface that is private. Only used for extending/implementing. When in
   * type position PrivateType is used.
   */
  interface PrivateInterface {}

  interface IObject<KEY1, VALUE> {}
}

// Will be extended if base.js is a dependency.
declare namespace ಠ_ಠ.clutz.goog {
  var __namespace_needs_to_be_non_value_empty__: void;
}

// Closure's goog namespace is accessible as a global symbol without the need for
// an explicit goog.require, during the closure compiler pass.
declare var goog: typeof ಠ_ಠ.clutz.goog;
/**
 * Global variable indicating whether the JavaScript code has been compiled.
 * This variable is defined in Closure's base.js, but not on the `goog` namespace, which
 * means it has to be explcitly declared here, similar to `goog` itself above.
 */
declare var COMPILED: boolean;
