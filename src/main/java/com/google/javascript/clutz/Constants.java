package com.google.javascript.clutz;

/** Shared constants for Clutz. */
public interface Constants {
  /**
   * The namespace prefix. Admittedly this only exists here so that Eclipse's font rendering is not
   * disturbed by the extended Unicode character.
   */
  static final String INTERNAL_NAMESPACE = "ಠ_ಠ.clutz";

  /**
   * When providing foo.bar and foo.bar.Klass, we cannot generate a 'var bar: T' declaration,
   * because it collides with 'namespace foo.bar' declaration. We alias the first using a postfix.
   * The alias does not affect the external module declaration, thus the user can still import the
   * symbol using unaliased module name (i.e. import bar from 'goog:foo.bar').
   */
  static final String SYMBOL_ALIAS_POSTFIX = "__clutz_alias";
}
